

var marginbar = {top: 20, right: 20, bottom: 70, left: 40},
    widthbar = 1000 - marginbar.left - marginbar.right,
    heightbar = 500 - marginbar.top - marginbar.bottom;

// Parse the date / time
var	parseDate = d3.time.format("%Y").parse;

var xbar = d3.scale.ordinal().rangeRoundBands([0, widthbar],.05);

var ybar = d3.scale.linear().range([heightbar, 0]);

var xAxisbar = d3.svg.axis()
    .scale(xbar)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y"));

var yAxisbar = d3.svg.axis()
    .scale(ybar)
    .orient("left")
    .ticks(10);

var tip_bar = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>#Refugee:</strong> <span style='color:red'>" + d.NUM + "</span>";
  })

var svg_bar = d3.select("div#test").append("svg")
    .attr("width", widthbar + marginbar.left + marginbar.right)
    .attr("height", heightbar + marginbar.top + marginbar.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + marginbar.left + "," + marginbar.top + ")");
svg_bar.call(tip_bar);
d3.csv("Refugeenum.csv", function(error, data) {

    data.forEach(function(d) {
        d.YEAR = parseDate(d.YEAR);
        d.NUM = +d.NUM;
    });
	
  xbar.domain(data.map(function(d) { return d.YEAR; }));
  ybar.domain([0, d3.max(data, function(d) { return d.NUM; })]);

  svg_bar.append("g")
      .attr("class", "xbar axisBarchart")
      .attr("transform", "translate(0," + (heightbar + 5) + ")")
      .call(xAxisbar)
    .selectAll("text")
      .style("color","white")
      .style("text-anchor", "end")
      .attr("dx", "1em")
      .attr("dy", "1em")
      ;

  svg_bar.append("g")
      .attr("class", "ybar axisBarchart")
      .call(yAxisbar)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 + marginbar.left)
      .attr("x",0 - (heightbar / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Refugees")
      .attr("class","font");

  svg_bar.append("g")
      .attr("class", "data")
      .selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class","bar")
      .attr("x", function(d) { return xbar(d.YEAR); })
      .attr("width", xbar.rangeBand())
      .attr("y", function(d) { return ybar(d.NUM); })
      .attr("height", function(d) { return heightbar - ybar(d.NUM); })
      .on('mouseover', tip_bar.show)
      .on('mouseout', tip_bar.hide);

});
function type(d) {
  d.frequency = +d.frequency;
  return d;
}
