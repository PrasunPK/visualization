var RANGE = 10;
const UPPER_LIMIT = 100;
const LOWER_LIMIT = 0;

const WIDTH = 670;
const HEIGHT = 720;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var randomNumbers = [];
var generateRandomNumbers = function () {
    for (var i = 0; i < RANGE; i++) {
        randomNumbers.push(_.random(LOWER_LIMIT, UPPER_LIMIT));
    }
};
generateRandomNumbers();

var getLastRandomNumbers = function () {
    randomNumbers.push(_.random(0, 100));
    randomNumbers.shift(1);
    return randomNumbers;
};

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};

var populateLineChart = function (svg, randomNumbers, xScale, yScale) {
    var line = d3.line()
        .x(function (d, i) {
            return xScale(i);
        })
        .y(function (d) {
            return yScale(d);
        });

    svg.append('path')
        .attr('d', line(randomNumbers))
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('path', true);
};

var populateBarChart = function populateBarChart(svg, randomNumbers, xScale, yScale) {
    var width = 5;
    svg.selectAll('rect')
        .data(randomNumbers)
        .enter()
        .append('rect')
        .attr('height', function (d) {
            return INNER_HEIGHT - yScale(d);
        })
        .attr('width', width)
        .attr('x', function (d, i) {
            return xScale(i);
        })
        .attr('y', function (d) {
            return yScale(d);
        })
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('rect', true);

    svg.selectAll('rect').exit().remove();
};

var updateBarChart = function (svg, randomNumbers, yScale) {
    svg.selectAll('rect')
        .data(randomNumbers)
        .attr('height', function (d) {
            return INNER_HEIGHT - yScale(d);
        })
        .attr('y', function (d) {
            return yScale(d);
        });
};

var initializeChart = function (xAxis, yAxis, div) {
    var svg = d3.select(div).append("svg")
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    svg.selectAll('.xAxis .tick')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -INNER_HEIGHT)
        .classed('grid', true);

    svg.append('g')
        .attr('transform', translate(MARGIN - 5, MARGIN))
        .call(yAxis)
        .classed('yAxis', true);

    svg.selectAll('.yAxis .tick')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', INNER_WIDTH)
        .attr('y2', 0)
        .classed('grid', true);

    return svg;
};

var removeChartIfExists = function (svg) {
    svg.selectAll('.path').remove();
};

var loadChart = function () {
    var xScale = d3.scaleLinear()
        .domain([0, RANGE - 1])
        .range([0, INNER_WIDTH]);

    var yScale = d3.scaleLinear()
        .domain([100, 0])
        .range([0, INNER_HEIGHT]);

    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    var svgForLine = initializeChart(xAxis, yAxis, '#line-chart');
    var svgForBar = initializeChart(xAxis, yAxis, '#bar-chart');

    populateBarChart(svgForBar, randomNumbers, xScale, yScale);

    setInterval(function () {
        var randomNumbers = getLastRandomNumbers();

        removeChartIfExists(svgForLine);

        populateLineChart(svgForLine, randomNumbers, xScale, yScale);
        updateBarChart(svgForBar, randomNumbers, yScale);
    }, 250);

};

window.onload = loadChart;


