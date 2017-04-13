var widthmap = 960,
    heightmap = 500;

var color_domain_map = [0,20]
var color_map = d3.scale.linear()
            .domain(color_domain_map)
			  .range(["rgb(213,222,217)","rgb(255,0,0)"]);

var legendText_map = ["<1", "5 +", "10 +", "15 +","> 20"];
var svg_map = d3.select("div#USmap").append("svg")
    .attr("width", widthmap)
    .attr("height", heightmap);
var projection = d3.geo.albersUsa()
	.scale(1000)
	.translate([widthmap / 2, heightmap / 2]);
var path_map = d3.geo.path()
    .projection(projection);
d3.queue()
    .defer(d3.json, "us.json")
    .defer(d3.csv,"usmap.csv")
    .await(ready);

function ready(error, us, usmap) {
    if (error) throw error;
    //color.domain(d3.extent(usmap, function(d) { return d.numberofrefugee; }));
    var states = {};

    usmap.forEach(function(d) { states[d.id] = +d.numberofrefugee; });
    console.log(usmap);

    svg_map.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path_map)
        .style("fill", function(d) { return color_map(states[d.id]); });



    var legend = d3.select("div#USmap").append("svg")
            .attr("class", "legend")
            .attr("width", 140)
            .attr("height", 200)
            .selectAll("g")
            .data(color_map.ticks(5))
            .enter()
            .append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 18 + ")"; });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color_map);

    legend.append("text")
        .attr("class","legendText")
        .data(legendText_map)
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
           
}
