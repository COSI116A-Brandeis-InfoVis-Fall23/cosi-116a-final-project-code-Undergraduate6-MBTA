
//used Maptime Tutorial with some alterations (modern USA instead of 1790 in topologies array)
//when hovering the name of the states pop up
var svgStates = d3.select("svg #states"),
  svgBoundary = d3.select("svg #boundary"),
  states = {},
  startYear = 1790,
  currentYear = startYear;


var width = window.innerWidth, 
height = window.innerHeight;

var projection = d3.geoAlbersUsa()
.translate([width / 3, height / 2]); 

var path = d3.geoPath()
  .projection(projection);  

d3.json("data/usa.json", function(error, boundary) {
  svgBoundary.selectAll("path")
      .data(boundary.features)
      .enter()
  .append("path")
      .attr("d", path)
     });
d3.json("data/states.json", function(error, topologies) {  // (4)

var state = topojson.feature(topologies[11], topologies[11].objects.stdin);  // (5)

svgStates.selectAll("path")  
    .data(state.features)
    .enter()
  .append("path")
    .attr("d", path)
    .style("stroke","#000") 
  .style("fill", function(d, i) { 
    console.log("d is ", d)
    var name = d.properties.STATENAM.replace(" Territory", ""); 
    return colors[name]; 
  })
  .append("svg:title")
.text(function(d) { return d.properties.STATENAM; });
});




