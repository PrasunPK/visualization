var _data = [{key: 0, value: 20}, {key: 1, value: 10}, {key: 2, value: 30}, {key: 3, value: 50}, {key: 4, value: 48}];

var _colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range([d3.rgb(155, 193, 235), d3.rgb(8, 0, 255)]);

var updateChart = function (chartArea) {
    var bars = chartArea.selectAll('.bar')
        .data(_data, function (d) {
            return d.value;
        });

    bars
        .enter().append('div')
        .style('width', function (d) {
            return (d.value * 10) + 'px';
        })
        .text(function (d) {
            return d.value;
        })
        .classed('bar', true)
        .style('background-color', function (d) {
            return _colorScale(d.value);
        });

    bars.exit().remove();

};

var loadChart = function () {
    var chartArea = d3.select('.container')
        .append('div')
        .classed('chart-area', true);

    updateChart(chartArea);

    var key = 5;
    setInterval(function () {
        _data.push({key : key++, value : Math.floor(Math.random() * 100)});
        _data.shift();
        updateChart(chartArea);
    }, 1000);
};

window.onload = loadChart;