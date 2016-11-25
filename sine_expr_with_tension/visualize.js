const MARGIN = 30;
const HEIGHT = 600;
const WIDTH = 600;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var _xScale, _yScale;
var _tensionScale = d3.scaleLinear().domain([0, 100]).range([-1, 1]);

var generateSineExprValues = function () {
    var sineValues = [];
    for (var i = 0; i < 10; i++) {
        sineValues.push({x: i, y: (Math.sin(3 * i) + 1) / 2})
    }
    return sineValues;
};

var createSvg = function () {
    d3.select('body')
        .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    _xScale = d3.scaleLinear().domain([0, 10]).range([0, INNER_WIDTH]);
    _yScale = d3.scaleLinear().domain([0.0, 1.0]).range([INNER_HEIGHT, 0]);

    var xAxis = d3.axisBottom(_xScale).ticks(10);
    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(' + MARGIN + ', ' + (HEIGHT - MARGIN) + ')')
        .call(xAxis);

    var yAxis = d3.axisLeft(_yScale).ticks(10);
    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')')
        .call(yAxis);
};

var drawLineGraph = function (tension) {
    var graph = d3.select('svg')
        .append('g')
        .classed('graph', true)
        .attr('transform', 'translate(' + MARGIN + ', ' + MARGIN + ')');

    var sinPath = d3.line()
        .x(function (d) {
            return _xScale(d.x)
        })
        .y(function (d) {
            return _yScale((d.y))
        })
        .curve(d3.curveCardinal.tension(tension));

    graph.append('path').attr('d', sinPath(generateSineExprValues())).classed('line', true);
};

var createCircle = function (selection, dataSet) {
    selection
        .append('g')
        .selectAll('circle')
        .data(dataSet)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
            return _xScale(d.x)
        })
        .attr('cy', function (d) {
            return _yScale(d.y)
        })
        .attr('r', 5);
};

var drawScatterPlot = function () {
    var circle = d3.select('svg')
        .append('g')
        .classed('dot', true)
        .attr('transform', 'translate(' + MARGIN + ', ' + MARGIN + ')');

    createCircle(circle, generateSineExprValues());
};

var _tensions = [0, 20, 40, 60, 80, 100];

var createOptions = function () {
    d3.select('body')
        .on('change', change)
        .append('select')
        .selectAll('option')
        .data(_tensions)
        .enter().append('option')
        .text(function (d) {
            return d;
        });
};

var change = function () {
    var select = d3.select('select');
    var selectedIndex = select.property('selectedIndex');

    d3.select('svg').selectAll('.line').remove();
    d3.select('svg').selectAll('.dot').remove();

    drawLineGraph(_tensionScale(_tensions[selectedIndex]));
    drawScatterPlot();
};

window.onload = function () {
    createOptions();
    createSvg();
    drawLineGraph(-1);
    drawScatterPlot();
};