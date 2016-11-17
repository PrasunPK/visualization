var drawChart = function () {

    const MARGIN = 30;
    var HEIGHT = 700;
    var WIDTH = 1000;
    var INNER_HEIGHT = HEIGHT - MARGIN;
    var INNER_WIDTH = WIDTH - MARGIN;

    var lineOfPoints = [{x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7}, {x: 3, y: 5}, {x: 4, y: 3}, {x: 6, y: 4}, {
        x: 7,
        y: 2
    }, {x: 8, y: 3}, {x: 9, y: 2}];

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
        .x(function (d,i) {
            return xScale(i/10);
        })
        .y(function (d,i) {
            return yScale((Math.sin(i)/10) + 0.5);
        });

    var svg = container
        .append('svg')
        .attr('height', HEIGHT)
        .attr('width', WIDTH);

    svg.append('g')
        .attr('transform', 'translate(' + MARGIN + ', ' + MARGIN + ')')
        .call(yAxis);

    svg.append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + (INNER_HEIGHT + 10) + ')')
        .call(xAxis);

    svg.append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')')
        .append('path')
        .attr('d', line(lineOfPoints))
        .classed('line', true);

    svg.append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')')
        .append('path')
        .attr('d', sineLine(new Array(10)))
        .classed('line', true);

};

window.onload = drawChart;