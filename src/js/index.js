var zoomLevel = 2;

mapboxgl.accessToken = 'pk.eyJ1IjoibndhcndpY2siLCJhIjoiY2owYWR6NnZoMDA3NTMzb2F3aGQ2YXpvZyJ9.vQzH-hYOzRMurslNpAfiSg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', //stylesheet location
    center: [0, 0], // starting position
    zoom: zoomLevel // starting zoom
});

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