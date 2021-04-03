import locate from '../assets/compass.png'
import center from '../assets/center.png'
import { Image } from 'react-native'

const locateUri = Image.resolveAssetSource(locate).uri;
const centerUri = Image.resolveAssetSource(center).uri;

const leaflet = `

<!DOCTYPE html>
<html>
<head>
	
	<title>Quick Start - Leaflet</title>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>

    <link rel="stylesheet" href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css" />
    <script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.min.js"></script>

    <style> 
    body {
        padding: 0;
        margin: 0;
    }
    html, body, #myMap {
        height: 100%;
        width: 100%;
    }
    .leaflet-locate {
        background-image: url(${locateUri});
    }
    .leaflet-center {
        background-image: url(${centerUri});
    }
    
    </style>

	
</head>
<body>



<div id="myMap"></div>
<script>

    const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    const myMap = L.map('myMap').fitWorld();

    var tile = L.tileLayer(tilesProvider, {
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 13
    }).addTo(myMap);

    myMap.fitBounds([
        [42.928129720484264, -8.596746459275112],
        [42.93265446394879, -8.465597167120524],
        [42.843606832802664, -8.469888701549666],
        [42.84562062833106, -8.612024321842858]
    ]);

    var geojson = undefined;

    function addLayer(data) {
        if(geojson != undefined) {
            myMap.removeLayer(geojson);
            geojson = undefined;
        }
        geojson = L.geoJson(data, {
            onEachFeature: function(feature, layer) {
                layer.bindPopup('<p>'+feature.properties.display_name+'</p>');
                layer.on('click', function(e) {
                    myMap.setView(e.latlng, 16);
                });
            }
        }).addTo(myMap);
    }

    var options = {
        position: 'topright', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
        drawMarker: true, // adds button to draw markers
        drawPolyline: false, // adds button to draw a polyline
        drawRectangle: false, // adds button to draw a rectangle
        drawPolygon: false, // adds button to draw a polygon
        drawCircle: false, // adds button to draw a cricle
        cutPolygon: false, // adds button to cut a hole in a polygon
        editMode: false, // adds button to toggle edit mode for all layers
        removalMode: true, // adds a button to remove layers
        drawCircleMarker: false,
        dragMode: false
    };
    
    // add leaflet.pm controls to the map
    myMap.pm.addControls(options);
    
    myMap.pm.setLang('es');

    var locateControl = {
        name: "Locate",
        block: "custom",
        title: "Localizar posicion actual",
        onClick: function() {
            window.ReactNativeWebView.postMessage("Hello!")
        },
        toggle: false,
        className: "leaflet-locate"
    }
    
    myMap.pm.Toolbar.createCustomControl(locateControl);

    var centerControl = {
        name: "Center",
        block: "custom",
        title: "Centrar vista",
        onClick: function() {
            myMap.setView([42.88078486209454, -8.544641203634002], 13);
        },
        toggle: false,
        className: "leaflet-center"
    }
    
    myMap.pm.Toolbar.createCustomControl(centerControl);

    function addMarker(lat, lang) {
        L.marker([lat, lang]).addTo(myMap);
        myMap.setView([lat, lang], 16);
    }

</script>

</body>
</html>
`

export default leaflet