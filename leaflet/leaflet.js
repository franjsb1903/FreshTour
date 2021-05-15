import { getImageUri } from '../Util/ImageUtil';
const center = getImageUri("center_map");
const locate = getImageUri("locate_map");
const menu = getImageUri("menu_map");
const clear = getImageUri("clear_map");

const leaflet = `

<!DOCTYPE html>
<html>

<head>

    <title>Quick Start - Leaflet</title>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>

    <link rel="stylesheet" href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css" />
    <script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.min.js"></script>

    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/leaflet-extra-markers@1.0.6/dist/css/leaflet.extra-markers.min.css">
    <script
        src="https://cdn.jsdelivr.net/npm/leaflet-extra-markers@1.0.6/src/assets/js/leaflet.extra-markers.min.js"></script>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

    <style>
        body {
            padding: 0;
            margin: 0;
        }

        html,
        body,
        #myMap {
            height: 100%;
            width: 100%;
        }

        .leaflet-locate {
            background-image: url(${locate});
        }

        .leaflet-center {
            background-image: url(${center});
        }

        .leaflet-menu {
            background-image: url(${menu});
        }

        .leaflet-clear {
            background-image: url(${clear});
        }

        html,
        body {
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
            bottom: 0;
            left: -50%;
            display: flex;
            flex-direction: column;
            text-align: center;
        }

        /*Wrap the content of the divicon (text) in this class*/
        .map-label-content {
            order: 1;
            position: relative;
            left: -50%;
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
            width: 0px;
            height: 0px;
            left: 50%;
            border-style: solid;
            border-color: #444 transparent transparent transparent;
            border-width: 10px 6px 0 6px;
            /*[first number is height, second/fourth are rigth/left width]*/
            margin-left: -6px;
        }

        /*Instance classes*/
        .map-label.inactive {
            opacity: 0.5;
        }

        .map-label.redborder>.map-label-content {
            border-color: #e00;
        }

        .map-label.redborder>.map-label-arrow {
            border-top-color: #e00;
        }

        .map-label.redbackground>.map-label-content {
            white-space: default;
            color: #fff;
            background-color: #e00;
        }

        .content {
            padding: 10px;
          }
    </style>
</head>

<body>



    <div id="myMap"></div>
    <script>

        const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        const transportTile = 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png';
        const humanitarianTile = 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
        const noLabelsTile = 'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png';

        var standard = L.tileLayer(tilesProvider, { id: 'standard', tileSize: 512, zoomOffset: -1, maxZoom: 18 });
        var transport = L.tileLayer(transportTile, { id: 'transport', tileSize: 512, zoomOffset: -1, maxZoom: 18 });
        var humanitarian = L.tileLayer(humanitarianTile, { id: 'humanitarian', tileSize: 512, zoomOffset: -1, maxZoom: 18 });
        var noLabels = L.tileLayer(noLabelsTile, { id: 'noLabels', tileSize: 512, zoomOffset: -1, maxZoom: 18 });

        var baseMaps = {
            'Estándar': standard,
            Transporte: transport,
            Humanitario: humanitarian,
            'Sin labels': noLabels
        }

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

        L.control.layers(baseMaps, {}).addTo(myMap);

        var geojson = undefined;

        function addLayer(data, tipo) {
            if (geojson != undefined) {
                myMap.removeLayer(geojson);
                geojson = undefined;
            }
            geojson = L.geoJson(data, {
                onEachFeature: function (feature, layer) {
                    if (feature.properties.display_name === undefined && feature.properties.titulo !== null) {
                        layer.bindPopup('<p>' + feature.properties.titulo + '</p>');
                    } else if (feature.properties.display_name !== undefined) {
                        layer.bindPopup('<p>' + feature.properties.display_name + '</p>');
                    } else {
                        layer.bindPopup('<p>' + traductor(feature.properties.sub_tag) + '</p>');
                    }
                    setIcon(layer, traductor(feature.properties.sub_tag));
                    layer.on('click', function (e) {
                        myMap.setView(e.latlng);
                    });
                }
            }).addTo(myMap);
        }

        var route = undefined;

        function addRoute(data) {
            if (route != undefined) {
                myMap.removeLayer(route);
                route = undefined;
            }
            if (marker != undefined) {
                myMap.removeLayer(marker);
                marker = undefined;
            }
            route = L.geoJson(data).addTo(myMap);
        }

        var options = {
            position: 'topright', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
            drawMarker: false, // adds button to draw markers
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
            onClick: function () {
                window.ReactNativeWebView.postMessage("location");
            },
            toggle: false,
            className: "leaflet-locate"
        }

        myMap.pm.Toolbar.createCustomControl(locateControl);

        var centerControl = {
            name: "Center",
            block: "custom",
            title: "Centrar vista",
            onClick: function () {
                myMap.setView([42.88078486209454, -8.544641203634002], 13);
            },
            toggle: false,
            className: "leaflet-center"
        }

        myMap.pm.Toolbar.createCustomControl(centerControl);

        var menuControl = {
            name: "Menu",
            block: "custom",
            title: "Menú",
            onClick: function () {
                window.ReactNativeWebView.postMessage("menu");
            },
            toggle: false,
            className: "leaflet-menu"
        }

        myMap.pm.Toolbar.createCustomControl(menuControl);

        var clearControl = {
            name: "Clear",
            block: "custom",
            title: "Limpar",
            onClick: function () {
                if (geojson != undefined) {
                    myMap.removeLayer(geojson);
                    geojson = undefined;
                }
            },
            toggle: false,
            className: "leaflet-clear"
        }

        myMap.pm.Toolbar.createCustomControl(clearControl);

        function addMarker(lat, lang) {
            L.marker([lat, lang], {
                icon: userMarker
            }).addTo(myMap);
            myMap.setView([lat, lang], 13);
        }

        var marker = undefined;
        var arrayMarkers = [];

        function addMarkerNo(lat, lang, name, c) {
            var icon = L.divIcon({
                iconSize: null,
                html: '<div class="map-label"><div class="map-label-content">' + c + '</div><div class="map-label-arrow"></div></div>',
                popupAnchor: [0, -30]
            });

            marker = L.marker([lang, lat], { icon: icon });
            marker.bindPopup('<p>' + name + '</p>');
            marker.addTo(myMap);
            arrayMarkers.push(marker);
        }

        function deleteMarkerPlanificacionLayer() {
            for (var i = 0; i < arrayMarkers.length; i++) {
                myMap.removeLayer(arrayMarkers[i]);
            }
            arrayMarkers = [];
        }

        let userMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'red',
            prefix: 'fa',
            icon: 'fa-user',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let hotelMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-hotel',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let hostalMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue-dark',
            prefix: 'fa',
            icon: 'fa-hotel',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let aloxamentoMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'green',
            prefix: 'fa',
            icon: 'fa-house-user',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let vivendaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'green-dark',
            prefix: 'fa',
            icon: 'fa-house-user',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let motelMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue-ligth',
            prefix: 'fa',
            icon: 'fa-hotel',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let campingMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'orange',
            prefix: 'fa',
            icon: 'fa-campground',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let caravanMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'orange-dark',
            prefix: 'fa',
            icon: 'fa-caravan',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let barMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'red-dark',
            prefix: 'fa',
            icon: 'fa-glass-cheers',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let restauranteMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'yellow',
            prefix: 'fa',
            icon: 'fa-utensils',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let cafeMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'red',
            prefix: 'fa',
            icon: 'fa-coffee',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let pubMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'red-light',
            prefix: 'fa',
            icon: 'fa-glass-martini-alt',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let zonaComidasMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'yellow-dark',
            prefix: 'fa',
            icon: 'fa-utensils',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let comidaRapidaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-hamburger',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let xeaderiaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'rose-dark',
            prefix: 'fa',
            icon: 'fa-ice-cream',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let panaderiaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'orange-light',
            prefix: 'fa',
            icon: 'fa-bread-slice',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let panaderiaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'orange',
            prefix: 'fa',
            icon: 'fa-bread-slice',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let chocolateMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'brown',
            prefix: 'fa',
            icon: 'fa-mug-hot',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        function setIcon(layer, tipo) {
            switch (tipo) {
                case "Hotel":
                    layer.setIcon(hotelMarker);
                    break;
                case "Hostal":
                    layer.setIcon(hostalMarker);
                    break;
                case "Aloxamento":
                    layer.setIcon(aloxamentoMarker);
                    break;
                case "Motel":
                    layer.setIcon(motelMarker);
                    break;
                case "Camping":
                    layer.setIcon(campingMarker);
                    break;
                case "Estacionamento de caravanas":
                    layer.setIcon(caravanMarker);
                    break;
                case "Vivenda":
                    layer.setIcon(vivendaMarker);
                    break;
                case "Bar":
                    layer.setIcon(barMarker);
                    break;
                case "Restaurante":
                    layer.setIcon(restauranteMarker);
                    break;
                case "Café":
                    layer.setIcon(cafeMarker);
                    break;
                default:
                    break;

            }
        }

        const traductor = (tag) => {
            switch (tag) {
                case "hotel":
                    return "Hotel";
                case "hostel":
                    return "Hostal";
                case "guest_house":
                    return "Aloxamento";
                case "caravan_site":
                    return "Estacionamento de caravanas";
                case "apartment":
                    return "Vivenda";
                case "camp_pitch":
                    return "Camping";
                case "camp_site":
                    return "Camping";
                case "motel":
                    return "Motel";
                case "bar":
                    return "Bar";
                case "restaurant":
                    return "Restaurante";
                case "cafe":
                    return "Café";
                case "pub":
                    return "Pub";
                case "food_court":
                    return "Zona de comidas";
                case "fast_food":
                    return "Comida rápida";
                case "ice_cream":
                    return "Xeadería";
                case "confectionery":
                    return "Pastelería";
                case "bakery":
                    return "Panadería";
                case "chocolate":
                    return "Chocolatería";
                case "picnic_table":
                    return "Picnic";
                case "picnic_site":
                    return "Picnic";
                case "amusement_arcade":
                    return "Sala de xogos";
                case "bowling_alley":
                    return "Bolera";
                case "escape_game":
                    return "Escape room";
                case "garden":
                    return "Xardín";
                case "park":
                    return "Parque";
                case "playground":
                    return "Parque infantil";
                case "stadium":
                    return "Estadio";
                case "trampoline_park":
                    return "Parque de camas elásticas";
                case "pitch":
                    return "Zona de deportes ao aire libre";
                case "sports_centre":
                    return "Centro deportivo";
                case "outdoor_seating":
                    return "Terraza";
                case "dance":
                    return "Baile";
                case "sports_hall":
                    return "Pabellón deportivo";
                case "cinema":
                    return "Cine";
                case "theatre":
                    return "Teatro";
                case "nightclub":
                    return "Club nocturno";
                case "viewpoint":
                    return "Mirador";
                case "bank":
                    return "Banco";
                case "pharmacy":
                    return "Farmacia";
                case "post_office":
                    return "Oficina de Correos";
                case "taxi":
                    return "Taxi";
                case "police":
                    return "Policía";
                case "bicycle_parking":
                    return "Parking de bicicletas";
                case "atm":
                    return "Caixeiro";
                case "toilets":
                    return "Baños públicos";
                case "supermarket":
                    return "Supermercado";
                case "convenience":
                    return "Pequeno supermercado";
                case "seafood":
                    return "Pescadería";
                case "butcher":
                    return "Carnicería";
                case "clothes":
                    return "Tenda de roupa";
                case "gift":
                    return "Tenda de regalos";
                case "shoes":
                    return "Tenda de zapatos";
                case "beverages":
                    return "Tenda de bebidas";
                case "department_store":
                    return "Grandes almacenes";
                case "bag":
                    return "Tenda de bolsas";
                case "perfumery":
                    return "Perfumería";
                case "information":
                    return "Punto de información";
                case "hospital":
                    return "Hospital";
                case "clinic":
                    return "Clínica";
                case "photo":
                    return "Tenda de fotos";
                default:
                    return "Elemento";
            }
        }

    </script>

</body>

</html>
`

export default leaflet