var drawChart = function () {
    var padding = 50;
    const ELEMENT_WIDTH = 100;
    const ELEMENT_HEIGHT = 100;

    var container = d3.select('.container');

    var svg = container
        .append('svg')
        .attr('height', 100)
        .attr('width', 840)
        .style('border', '1px solid blue');

    svg
        .append('g')
        .append('line')
        .attr('x1', 0)
        .attr('y1', ELEMENT_HEIGHT)
        .attr('x2', ELEMENT_WIDTH)
        .attr('y2', 0)
        .style('fill', 'none')
        .style('stroke', 'grey')
        .style('stroke-width', '2');

    svg
        .append('g')
        .append('circle')
        .attr('cx', ELEMENT_WIDTH + (padding * 2))
        .attr('cy', padding)
        .attr('r', 50)
        .style('fill', 'none')
        .style('stroke', 'red')
        .style('stroke-width', '2');

    svg.append('g')
        .append('rect')
        .attr('x', ELEMENT_WIDTH * 3)
        .attr('y', 0)
        .attr('height', ELEMENT_HEIGHT)
        .attr('width', ELEMENT_WIDTH)
        .style('fill', 'none')
        .style('stroke', 'steelblue')
        .style('stroke-width', '2');

    svg.append('g')
        .append('polygon')
        .attr('points', '500,0 550,100 450,100')
        .style('fill', 'none')
        .style('stroke', 'green')
        .style('stroke-width', '2');

};
window.onload = drawChart;
