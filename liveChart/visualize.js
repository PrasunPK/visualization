var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};
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
            return xScale(i) - (width/2);
        })
        .attr('y', function (d) {
            return yScale(d);
        })
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('rect', true);
};

var initializeChart = function (xAxis, yAxis, div) {
    var svg = d3.select(div).append("svg")
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    svg.append('g')
        .attr('transform', translate(MARGIN-5, MARGIN))
        .call(yAxis)
        .classed('yAxis', true);
    return svg;
};

var removeChartIfExists = function (svgForLine, svgForBar) {
    svgForLine.selectAll('.path').remove();
    svgForBar.selectAll('.rect').remove();
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

    setInterval(function () {
        var randomNumbers = getLastRandomNumbers();

        removeChartIfExists(svgForLine, svgForBar);

        populateLineChart(svgForLine, randomNumbers, xScale, yScale);
        populateBarChart(svgForBar, randomNumbers, xScale, yScale);

    }, 250);

};

window.onload = loadChart;

