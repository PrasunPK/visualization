var _data = [20, 10, 30, 50, 20, 23, 67, 89, 78, 100];

var _colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range([d3.rgb(155, 193, 235), d3.rgb(8, 0, 255)]);
;

var updateChart = function (chartArea) {
    chartArea.selectAll('.bar')
        .data(_data)
        .style('width', function (d) {
            return (d * 10 ) + 'px';
        }).text(function (d) {
        return d;
    }).classed('bar', true)
        .style('background-color', function (d) {
            return _colorScale(d);
        });
};

var loadChart = function () {
    var chartArea = d3.select('.container')
        .append('div')
        .classed('chart-area', true);

    var bars = chartArea.selectAll('div')
        .data(_data)
        .enter().append('div');

    bars.style('width', function (d) {
        return (d * 10) + 'px';
    }).text(function (d) {
        return d;
    }).classed('bar', true)
        .style('background-color', function (d) {
            return _colorScale(d);
        });

    setInterval(function () {
        _data.push(Math.floor(Math.random() * 100));
        updateChart(chartArea);
        _data.shift();
    }, 1000);
};

window.onload = loadChart;