var drawChart = function () {
    var data = [1, 1, 2, 2, 1, 2, 1];
    var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

    const HEIGHT = 600;
    const WIDTH = 720;
    var margin = 30;

    var INNER_HEIGHT = HEIGHT - margin;
    var INNER_WIDTH = WIDTH - margin;

    var arcs = d3.pie().sort(null)
        .endAngle(360)(data);

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(200);

    var svg = d3.select('.container').append('svg').attr('height', HEIGHT).attr('width', WIDTH);

    var g = svg.append("g")
        .attr("transform", "translate(" + INNER_HEIGHT / 2 + "," + INNER_WIDTH / 2 + ")");

    g.selectAll('.arc').data(arcs)
        .enter().append('path')
        .attr("d", arc)
        .style("fill", function (d) {
            return colorScale(d.index);
        });

};
window.onload = drawChart;