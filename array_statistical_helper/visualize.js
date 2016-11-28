const WIDTH = 1024;
const HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var _xScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, INNER_WIDTH]);

var _yScale = d3.scaleLinear()
    .domain([100, 0])
    .range([0, INNER_HEIGHT]);

var _svg;

var createSvg = function () {
    _svg = d3.select('.container').append('svg').attr('height', HEIGHT).attr('width', WIDTH);
};

var data = [{value: 10}, {value: 40}, {value: 90}, {value: 45}, {value: 45},
    {value: 60}, {value: 20}, {value: 21}, {value: 35}, {value: 35}, {value: 95}];

var drawChart = function () {
    var g = _svg.append('g').attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');

    g.selectAll('.rect')
        .data(data)
        .enter().append('rect')
        .attr('height', function (d) {
            return INNER_HEIGHT - _yScale(d.value);
        })
        .attr('width', 20)
        .attr('x', function (d, i) {
            return _xScale(i);
        })
        .attr('y', function (d) {
            return _yScale(d.value);
        })
        .classed('rect', true);
};

var drawAxis = function () {
    var xAxis = d3.axisBottom(_xScale).ticks(10);
    var yAxis = d3.axisLeft(_yScale).ticks(10);

    _svg.append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + (HEIGHT - MARGIN) + ')')
        .call(xAxis);

    _svg.append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')')
        .call(yAxis);
};

var drawLine = function (operation) {
    var lineG = _svg.append('g').attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');

    lineG.append('line')
        .attr('x1', 0)
        .attr('y1', _yScale(operation()))
        .attr('x2', INNER_WIDTH)
        .attr('y2', _yScale(operation()))
        .classed('line', true);
};

var max = function () {
    return d3.max(data, function (d) {
        return d.value;
    });
};

var min = function () {
    return d3.min(data, function (d) {
        return d.value;
    });
};

var mean = function () {
    return d3.mean(data, function (d) {
        return d.value;
    });
};

var median = function () {
    return d3.median(data, function (d) {
        return d.value;
    });
};

var quantile = function () {
    return d3.quantile(data, 1, function (d) {
        return d.value;
    });
};

var variance = function () {
    return d3.variance(data, function (d) {
        return d.value;
    });
};

var drawMaxLine = function () {
    drawLine(max);
};

var drawMinLine = function () {
    drawLine(min);
};

var drawMeanLine = function () {
    drawLine(mean);
};

var drawMedianLine = function () {
    drawLine(median);
};

var drawQuantileLine = function () {
    drawLine(quantile);
};

var drawVarianceLine = function () {
    drawLine(quantile);
};

var helperFunctions = [{name: 'MAX', method: drawMaxLine}, {name: 'MIN', method: drawMinLine},
    {name: 'MEAN', method: drawMeanLine}, {name: 'MEDIAN', method: drawMedianLine},
    {name: 'QUANTILE', method: drawQuantileLine}, {name: 'VARIANCE', method: drawVarianceLine}];

var drawOptions = function () {
    d3.select('body #options')
        .selectAll('input')
        .data(helperFunctions)
        .enter().append('input')
        .attr('type', 'button')
        .attr('value', function (d) {
            return d.name;
        })
        .on('click', function (d) {
            return d.method();
        });
};

window.onload = function () {
    drawOptions();
    createSvg();
    drawAxis();
    drawChart();
};