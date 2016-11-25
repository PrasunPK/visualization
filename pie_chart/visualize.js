var _options = [
    {name: 'Full pie chart', innerRadius: 0, endAngle: (2 * Math.PI)},
    {name: 'Half pie chart', innerRadius: 0, endAngle: (Math.PI)},
    {name: 'Full ring', innerRadius: 100, endAngle: (2 * Math.PI)},
    {name: 'Half ring', innerRadius: 100, endAngle: (Math.PI)}
];

const HEIGHT = 600;
const WIDTH = 720;
var margin = 30;
var INNER_HEIGHT = HEIGHT - margin;
var INNER_WIDTH = WIDTH - margin;

var _group;

var drawChart = function (innerRadius, endAngle) {
    var data = [1, 1, 2, 2, 1, 2, 1];
    var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

    var arcs = d3.pie().sort(null)
        .endAngle(endAngle)(data);

    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(200);

    _group.selectAll('.arc').data(arcs)
        .enter().append('path')
        .attr("d", arc)
        .style("fill", function (d) {
            return colorScale(d.index);
        })
        .classed('arc', true);

};

var createGroup = function () {
    var svg = d3.select('.container').append('svg').attr('height', HEIGHT).attr('width', WIDTH);
    _group = svg.append("g")
        .attr("transform", "translate(" + INNER_HEIGHT / 2 + "," + INNER_WIDTH / 2 + ")");
};

var createOptions = function () {
    d3.select('#options')
        .on('change', change)
        .append('select')
        .selectAll('option')
        .data(_options)
        .enter().append('option')
        .text(function (d) {
            return d.name;
        });
};

var change = function () {
    d3.select('svg').selectAll('.arc').remove();

    var select = d3.select('select');
    var selectedIndex = select.property('selectedIndex');
    var selectedArc = _options[selectedIndex];

    drawChart(selectedArc.innerRadius, selectedArc.endAngle);
};
window.onload = function () {
    createOptions();
    createGroup();
};