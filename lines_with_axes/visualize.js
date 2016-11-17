var drawLine = function (line, lineOfPoints) {
    _svg.append('g')
        .attr('transform', translate(_MARGIN, _MARGIN))
        .append('path')
        .attr('d', line(lineOfPoints))
        .classed('line', true);
};

const _MARGIN = 30;
var _svg;

var translate = function (x, y) {
    return 'translate(' + x + ',' + y + ')';
};
var drawDataPoints = function (lineOfPoints, line) {
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

var drawChart = function () {
    var lineOfPoints = [{x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7}, {x: 3, y: 5}, {x: 4, y: 3}, {x: 6, y: 4}, {
        x: 7,
        y: 2
    }, {x: 8, y: 3}, {x: 9, y: 2}];

    var HEIGHT = 700;
    var WIDTH = 1000;
    var INNER_HEIGHT = HEIGHT - _MARGIN;

    var xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 650]);

    var yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([650, 0]);

    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    var container = d3.select('.container');

    var line = d3.line()
        .x(function (d) {
            return xScale(d.x / 10);
        })
        .y(function (d) {
            return yScale(d.y / 10);
        });

    var sineLine = d3.line()
        .x(function (d, i) {
            return xScale(i / 10);
        })
        .y(function (d, i) {
            return yScale((Math.sin(i) / 10) + 0.5);
        });

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

    drawLine(line, lineOfPoints);
    drawLine(sineLine, new Array(10));

    drawDataPoints(lineOfPoints, line);
    drawDataPoints(new Array(10), sineLine);

};

window.onload = drawChart;