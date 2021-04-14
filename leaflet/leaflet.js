const { Image, Platform } = require('react-native');

const center = require('../images/map/center.png');
const locate = require('../images/map/compass.png');
const a_letter = require('../images/map/icons/letter_a.png');
const b_letter = require('../images/map/icons/letter_b.png');
const c_letter = require('../images/map/icons/letter_c.png');
var locateUri, centerUri, aLetterUri, bLetterUri, cLetterUri;

if (Platform.OS != "web") {
    locateUri = Image.resolveAssetSource(locate).uri;
    centerUri = Image.resolveAssetSource(center).uri;
    aLetterUri = Image.resolveAssetSource(a_letter).uri;
    bLetterUri = Image.resolveAssetSource(b_letter).uri;
    cLetterUri = Image.resolveAssetSource(c_letter).uri;
} else {
    locateUri = locate.uri;
    centerUri = center.uri;
}


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
    html, body {
        margin: 0;
        width: 100%;
        height: 100%;
      }
      #map {
        float: left;
        margin: 0;
        width: 100%;
        height: 100%;
      }
      
      /*Wraperclass for the divicon*/
      .map-label {
        position: absolute;
        bottom: 0;left: -50%;
        display: flex;
        flex-direction: column;
        text-align: center;
      }
      /*Wrap the content of the divicon (text) in this class*/
      .map-label-content {
        order: 1;
        position: relative; left: -50%;
        background-color: #fff;
        border-radius: 5px;
        border-width: 2px;
        border-style: solid;
        border-color: #444;
        padding: 3px;
        white-space: nowrap;
      }
      /*Add this arrow*/
      .map-label-arrow {
        order: 2;
        width: 0px; height: 0px; left: 50%;
        border-style: solid;
        border-color: #444 transparent transparent transparent;
        border-width: 10px 6px 0 6px; /*[first number is height, second/fourth are rigth/left width]*/
        margin-left: -6px;
      }
      
      /*Instance classes*/
      .map-label.inactive {
        opacity: 0.5;
      }
      
      .map-label.redborder > .map-label-content {
        border-color: #e00;
      }
      .map-label.redborder > .map-label-arrow {
        border-top-color: #e00;
      }
      
      .map-label.redbackground > .map-label-content {
        white-space: default;
        color: #fff;
        background-color: #e00;
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
                if(feature.properties.display_name === undefined) {
                    layer.bindPopup('<p>'+feature.properties.titulo+'</p>');
                } else {
                    layer.bindPopup('<p>'+feature.properties.display_name+'</p>');
                }
                myMap.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 16);
                layer.on('click', function(e) {
                    myMap.setView(e.latlng, 16);
                });
            }
        }).addTo(myMap);
    }

    var route = undefined;

    function addRoute(data) {
        if(route != undefined) {
            myMap.removeLayer(route);
            route = undefined;
        }
        if(marker != undefined) {
            myMap.removeLayer(marker);
            marker = undefined;
        }
        route = L.geoJson(data).addTo(myMap);
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

    var marker = undefined;

    function addMarkerNo(lat, lang, name, c) {
        var icon = L.divIcon({
            iconSize:null,
            html:'<div class="map-label"><div class="map-label-content">' + c + '</div><div class="map-label-arrow"></div></div>',
            popupAnchor: [0, -30]
          });

        marker = L.marker([lang, lat], {icon: icon});
        marker.bindPopup('<p>' + name + '</p>');
        marker.addTo(myMap);
    }

</script>

</body>
</html>
`

export default leaflet