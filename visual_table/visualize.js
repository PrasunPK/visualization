var _headingRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var _headingColumns = {
    header: 'Title',
    n: 'n',
    nSquare: 'n square',
    logN: 'log(n)',
    logNRounded: 'log(n) rounded'
};

var _container;

var changeRowHeader = function (rowHeader) {
    _headingRow.shift();
    _headingRow.unshift(_headingColumns[rowHeader]);
};

var loadChart = function () {
    _container = d3.select('.container');

    var scaleLinear = d3.scaleLinear()
        .domain([1, 10])
        .range([1, 10]);

    var scaleSquare = d3.scalePow()
        .exponent(2)
        .domain([1, 10])
        .range([1, 100]);

    var scaleLog = d3.scaleLog()
        .base(10)
        .domain([1, 10])
        .range([0, 1]);

    var scaleRoundLog = d3.scaleLog()
        .base(10)
        .domain([1, 10])
        .rangeRound([0, 1]);

    var table = _container
        .append('table')
        .attr('class', 'log-table');

    _headingRow.unshift(_headingColumns.header);

    table.append('thead')
        .append('tr')
        .selectAll('th')
        .data(_headingRow)
        .enter().append('th')
        .text(function (d) {
            return isNaN(d) ? d : scaleLinear(d);
        });

    table.append('tbody');

    changeRowHeader('n');
    updateChart(scaleLinear);

    changeRowHeader('nSquare');
    updateChart(scaleSquare);

    changeRowHeader('logN');
    updateChart(scaleLog);

    changeRowHeader('logNRounded');
    updateChart(scaleRoundLog);
};

var updateChart = function (scale) {
    _container
        .select('table')
        .select('tbody')
        .append('tr')
        .selectAll('td')
        .data(_headingRow)
        .enter().append('td')
        .text(function (d) {
            return isNaN(d) ? d : scale(d);
        });

};
window.onload = loadChart;

