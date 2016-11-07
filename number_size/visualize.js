var loadChart = function () {
    var headingRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var container = d3.select('.container');

    var scaleFont = d3.scaleLinear()
        .domain([0, 10])
        .range(['italic bold 12px/30px sans-serif', 'italic bold 120px/180px sans-serif']);


    container.selectAll('div')
        .data(headingRow)
        .enter().append('div')
        .style('font', function (d) {
            return scaleFont(d) + 'px';
        })
        .text(function (d) {
            return d;
        })
        .classed('block', true);
};
window.onload = loadChart;

