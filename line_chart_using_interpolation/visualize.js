const _MARGIN = 30;
var _svg;
var _xScale = d3.scaleLinear().domain([0, 1]).range([0, 650]);
var _yScale = d3.scaleLinear().domain([0, 1]).range([650, 0]);

var _curves = [
    {name: 'Linear curve', method: 'curveLinear'},
    {name: 'Closed linear curve', method: 'curveLinearClosed'},
    {name: 'Step curve', method: 'curveStep'},
    {name: 'Curve basis', method: 'curveBasis'},
    {name: 'Curve bundle', method: 'curveBundle'},
    {name: 'Curve Monotone X', method: 'curveMonotoneX'},
    {name: 'Curve Natural', method: 'curveNatural'},
    {name: 'Curve Cardinal', method: 'curveCardinal'}
];

var translate = function (x, y) {
    return 'translate(' + x + ',' + y + ')';
};

var drawDataPoints = function (line, lineOfPoints) {
    _svg.append('g')
        .attr('transform', translate(_MARGIN, _MARGIN))
        .selectAll(".dot")
        .data(lineOfPoints)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 5);
};

var drawLine = function (line, colorClass, lineOfPoints) {
    _svg.append('g')
        .attr('transform', translate(_MARGIN, _MARGIN))
        .append('path')
        .datum(lineOfPoints)
        .attr('d', line)
        .classed('line', true)
        .classed(colorClass, true);

};

var drawBothLines = function (line, sineLine) {
    var lineOfPoints = [
        {x: 0, y: 5},
        {x: 1, y: 9},
        {x: 2, y: 7},
        {x: 3, y: 5},
        {x: 4, y: 3},
        {x: 6, y: 4},
        {x: 7, y: 2},
        {x: 8, y: 3},
        {x: 9, y: 2}
    ];
    var otherDataPoints = new Array(10);

    drawLine(line, 'red-line', lineOfPoints);
    drawDataPoints(line, lineOfPoints);

    drawLine(sineLine, 'blue-line', otherDataPoints);
    drawDataPoints(sineLine, otherDataPoints);
};

var generateLine = function (curve) {
    var line = d3.line()
        .x(function (d) {
            return _xScale(d.x / 10);
        })
        .y(function (d) {
            return _yScale(d.y / 10);
        })
        .curve(curve);

    var sineLine = d3.line()
        .x(function (d, i) {
            return _xScale(i / 10);
        })
        .y(function (d, i) {
            return _yScale((Math.sin(i) / 10) + 0.5);
        })
        .curve(curve);

    return {line: line, sineLine: sineLine};
};

var drawChart = function () {
    var HEIGHT = 700;
    var WIDTH = 1000;
    var INNER_HEIGHT = HEIGHT - _MARGIN;

    var xAxis = d3.axisBottom(_xScale).ticks(10);
    var yAxis = d3.axisLeft(_yScale).ticks(10);

    var container = d3.select('.container');
    _svg = container
        .append('svg')
        .attr('height', HEIGHT)
        .attr('width', WIDTH);

    _svg.append('g')
        .attr('transform', translate(_MARGIN, _MARGIN))
        .call(yAxis);

    _svg.append('g')
        .attr('transform', translate(_MARGIN, (INNER_HEIGHT + 10)))
        .call(xAxis);

    container.append('select')
        .on('change', change)
        .selectAll('option')
        .data(_curves)
        .enter().append('option')
        .text(function (d) {
            return d.name;
        });
};

var change = function () {
    var select = d3.select('select');
    var selectedIndex = select.property('selectedIndex');
    var selectedCurve = _curves[selectedIndex].method;

    var shape = generateLine(d3[selectedCurve]);
    var line = shape.line;
    var sineLine = shape.sineLine;

    _svg.selectAll('.line').remove();
    _svg.selectAll('.dot').remove();

    drawBothLines(line, sineLine);
};

window.onload = drawChart;