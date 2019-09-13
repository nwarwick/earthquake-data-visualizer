var zoomLevel = 2

mapboxgl.accessToken =
  'pk.eyJ1IjoibndhcndpY2siLCJhIjoiY2owYWR6NnZoMDA3NTMzb2F3aGQ2YXpvZyJ9.vQzH-hYOzRMurslNpAfiSg'
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/dark-v9', //stylesheet location
  center: [0, 0], // starting position
  zoom: zoomLevel // starting zoom
})

map.on('load', function() {
  map.addSource('quakes', {
    type: 'geojson',
    data:
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
  })
  map.addLayer({
    id: 'quakes',
    type: 'circle',
    source: 'quakes',
    layout: {
      visibility: 'visible'
    },
    paint: {
      'circle-radius': {
        property: 'mag',
        stops: [[1, 1], [2, 2], [3, 4], [4, 8], [5, 16], [6, 32], [7, 64]]
      },
      'circle-color': 'rgb(0, 249, 124)'
    }
  })
})
