
var height = 900;
var width = 450;
var padding = 100;


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
        return (item.Time);
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
    // axes();
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

    widthScale = d3.scaleLinear()
    .domain([0, d3.max(times)])
    .range([padding, width]);

    xScale = d3.scaleLinear()
    .domain(d3.extent(dates))
    .range([padding, width]);

    yScale = d3.scaleLinear()
    .domain([0, d3.max(dates)])
    .range([(height - padding), padding]);
};