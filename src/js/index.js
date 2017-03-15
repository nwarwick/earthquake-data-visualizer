var zoomLevel = 2;

mapboxgl.accessToken = 'pk.eyJ1IjoibndhcndpY2siLCJhIjoiY2owYWR6NnZoMDA3NTMzb2F3aGQ2YXpvZyJ9.vQzH-hYOzRMurslNpAfiSg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', //stylesheet location
    center: [0, 0], // starting position
    zoom: zoomLevel // starting zoom
});

var container = map.getCanvasContainer();
var svg = d3.select(container).append("svg");

function project(d) {
    return map.project(getLL(d));
}
// Grab data point and parse it into 
function getLL(d) {
    return new mapboxgl.LngLat(+d.lon, +d.lat);
}



map.on('load', function() {
    map.addSource('quakes', {
        type: 'geojson',
        data: '../data/query.json'
    });
    map.addLayer({
        'id': 'quakes',
        'type': 'circle',
        'source': 'quakes',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
                property: 'mag',
                stops: [
                    [1, 0.5],
                    [2, 1],
                    [3, 2],
                    [4, 4],
                    [5, 8],
                    [6, 16],
                    [7, 32],
                ]
            },
            'circle-color': 'rgb(0, 249, 124)'
        },
    });
});


/*d3.csv("../data/query.csv", function(data) {
    console.log(data[0]);
});*/

/*d3.csv("../data/loc.csv", function(err, data) {
    console.log(data[0]);
    var dots = svg.selectAll("circle.dot").data(data);

    dots.enter().append("circle").classed("dot", true)
        .attr("r", 1)
        .style({
            fill: "#0082a3",
            "fill-opacity": 0.6,
            stroke: "#004d60",
            "stroke-width": 1
        })
        .transition().duration(1000)
        .attr("r", 6);

    circleControl.on("update", function() {
        svg.selectAll("circle.dot").style({
            fill: function(d) {
                var thisDist = circleControl.distance(d);
                var circleDist = circleControl.distance();
                if (thisDist < circleDist) {
                    return "#ff8eec";
                } else {
                    return "#0082a3";
                }
            }
        });
    });
    circleControl.on("clear", function() {
        svg.selectAll("circle.dot").style("fill", "#0082a3");
    });

    function render() {
        dots.attr({
            cx: function(d) {
                var x = project(d).x;
                return x;
            },
            cy: function(d) {
                var y = project(d).y;
                return y;
            },
        });

        circleControl.update(svg);
    }

    // re-render our visualization whenever the view changes
    map.on("viewreset", function() {
        render();
    });
    map.on("move", function() {
        render();
    });

    // render our initial visualization
    render();
});*/

console.log(map);