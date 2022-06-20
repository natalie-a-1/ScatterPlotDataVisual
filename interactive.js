
var height = 900;
var width = 900;
var padding = 50;


var xAxis;
var yAxis;
var xScale;
var yScale;
var heightScale;
var widthScale;

var data = d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
.then(data => {

    //parsing and organizing data
    cases = data;

    dates = cases.map((item) => {
        return (item.Year);
    })

    times = cases.map((item) => {
        //todo: may need to be chnaged
        temp = item.Time.split(':');
        return new Date(0, 0, 0, 0, temp[0], temp[1]).getTime();
    })

    place = cases.map((item) => {
        return (item.Place);
    })

    seconds = cases.map((item) => {
        return (item.Seconds);
    })

    names = cases.map((item) => {
        return (item.Name);
    })

    nationality = cases.map((item) => {
        return (item.Nationality);
    })

    doping = cases.map((item) => {
        return (item.Doping);
    })

    urls = cases.map((item) => {
        return (item.URL);
    })

    svgBox();
    scales();
    axes();
    dots();
    window.scrollTo(0, 0);
});

var svgBox = () => {
    d3.select('#svgArea')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('overflow', 'hidden');

    svg = d3.selectAll('svg');
};

var scales = () => {
    heightScale = d3.scaleLinear()
    .domain([0, d3.max(dates)])
    .range([0, (height - padding)]);

    widthScale = d3.scaleTime()
    .domain([0, d3.max(times)])
    .range([padding, width]);

    xScale = d3.scaleLinear()
    .domain(d3.extent(dates))
    .range([padding, width-padding]);

    yScale = d3.scaleTime()
    .domain([0, d3.max(times)])
    .range([(height - padding), padding]);
};

var axes = () => {
    xAxis = d3.axisBottom(xScale);
    svg.append('g')
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0,' + (height - padding) + ')');

    yAxis = d3.axisLeft(yScale);
    svg.append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('transform', 'translate(' + padding + ', 0)');
}

var dots = () => {
    svg.selectAll('.dot')
    .data(cases)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr("data-xvalue", d => dates)
    .attr("data-yvalue", t => times)
    .attr('cy', t => yScale(times))
    .attr('cx', d => xScale(dates))
    .attr('r', 6)
}