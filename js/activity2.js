var width = 1000,
    height = 600;

var svg = d3.select("#geomap").append("svg")
    .attr("width", width)
    .attr("height", height);

// var projection = d3.geoMercator()
//     .translate([width / 2, height / 2])
//     .scale(100);

    var projection = d3.geoOrthographic()
    .translate([width / 2, height / 2])
    .scale(300);


var path = d3.geoPath()
     .projection(projection);

d3.json("data/world-110m.json")
  .then(function(data1) {
    d3.json("data/airports.json")
      .then(function(data2) {
        var world = topojson.feature(data1, data1.objects.countries).features
        console.log(world);

        // Render the U.S. by using the path generator
        svg.selectAll("path")
                .data(world)
            .enter().append("path")
                .attr("d",path);

      svg.selectAll("circle").data(data2.nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr("fill", "pink")
      .attr("transform", function(d) {
        return "translate(" + projection([d.longitude, d.latitude]) + ")";
    })
      });
    

  });

    // d3.json("data/world-110m.json").then(function(data) {
    //     var world = topojson.feature(data, data.objects.countries).features
    //     console.log(world);

    //     // Render the U.S. by using the path generator
    //     svg.selectAll("path")
    //             .data(world)
    //         .enter().append("path")
    //             .attr("d",path);
    // });