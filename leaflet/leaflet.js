import { getImageUri } from '../Util/ImageUtil';
const center = getImageUri("center_map");
const locate = getImageUri("locate_map");

const hotel = "hotel";

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
    .leaflet-control-slidemenu{
        cursor: pointer;
    }
    
    .leaflet-menu{
        position: absolute;
        background-color: rgba(255, 255, 255, 255);
        overflow: auto;
        cursor: default;
        z-index: 9999;
    }
    
    .leaflet-menu::-webkit-scrollbar{
        width: 7px;
        height: 7px;
        background: #f2f2f2;
    }
    
    .leaflet-menu::-webkit-scrollbar-thumb{
        border-radius: 2px;
        background: #777;   
    }
    
    .leaflet-menu-close-button{
        background-color: transparent;
        border: none;
        font-size: 14pt;
        color: #777;
        cursor: pointer;
    }
    
    .leaflet-menu-close-button:hover{
        color: #4285F4;
    }
    </style>

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

    <script>

    L.Control.SlideMenu = L.Control.extend({
        options: {
            position: 'topleft',
            menuposition: 'topleft', // topleft,topright,bottomleft,bottomright
            width: '300px',
            height: '100%',
            direction: 'horizontal', // vertical or horizontal
            changeperc: '10',
            delay: '10',
            icon: 'fas fa-bars',
            hidden: false
        },
    
        initialize: function(innerHTML, options){
            L.Util.setOptions(this, options);
            this._innerHTML = innerHTML;
            this._isLeftPosition = this.options.menuposition == 'topleft' ||
                this.options.menuposition == 'bottomleft' ? true : false;
            this._isTopPosition = this.options.menuposition == 'topleft' ||
                this.options.menuposition == 'topright' ? true : false;
            this._isHorizontal = this.options.direction == 'horizontal' ? true : false;
        },
    
        onAdd: function(map){
            this._container = L.DomUtil.create('div', 'leaflet-control-slidemenu leaflet-bar leaflet-control');
            var link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single', this._container);
            link.title = 'Menu';
            L.DomUtil.create('span', this.options.icon, link);
    
            this._menu = L.DomUtil.create('div', 'leaflet-menu', map._container);
    
            this._menu.style.width = this.options.width;
            this._menu.style.height = this.options.height;
    
            if(this._isHorizontal){
                var frominit = -(parseInt(this.options.width, 10));
                if(this._isLeftPosition){
                    this._menu.style.left = '-' + this.options.width;
                }
                else{
                    this._menu.style.right = '-' + this.options.width;
                }
    
                if(this._isTopPosition){
                    this._menu.style.top = '0px';
                }
                else{
                    this._menu.style.bottom = '0px';
                }
            }
            else{
                var frominit = -(parseInt(this.options.height, 10));
                if(this._isLeftPosition){
                    this._menu.style.left = '0px';
                }
                else{
                    this._menu.style.right = '0px';
                }
    
                if(this._isTopPosition){
                    this._menu.style.top = '-' + this.options.height;
                }
                else{
                    this._menu.style.bottom = '-' + this.options.height;
                }
            }
    
            var closeButton = L.DomUtil.create('button', 'leaflet-menu-close-button', this._menu);
    
            if(this._isHorizontal){
                if(this._isLeftPosition){
                    closeButton.style.float = 'right';
                    L.DomUtil.addClass(closeButton, 'fas fa-chevron-left');
                }
                else{
                    closeButton.style.float = 'left';
                    L.DomUtil.addClass(closeButton, 'fas fa-chevron-right');
                }
            }
            else{
                if(this._isTopPosition){
                    closeButton.style.float = 'right';
                    L.DomUtil.addClass(closeButton, 'fas fa-chevron-up');
                }
                else{
                    closeButton.style.float = 'right';
                    L.DomUtil.addClass(closeButton, 'fas fa-chevron-down');
                }
            }
    
            this._contents = L.DomUtil.create('div', 'leaflet-menu-contents', this._menu);
            this._contents.innerHTML = this._innerHTML;
            this._contents.style.clear = 'both';
    
            if(this._isHorizontal){
                var ispx = this.options.width.slice(-1) == 'x' ? true : false;
                var unit = parseInt(this.options.width, 10) * parseInt(this.options.changeperc, 10) / 100;
            }
            else{
                var ispx = this.options.height.slice(-1) == 'x' ? true : false;
                var unit = parseInt(this.options.height, 10) * parseInt(this.options.changeperc, 10) / 100;
            }
    
            L.DomEvent.disableClickPropagation(this._menu);
            L.DomEvent
                .on(link, 'click', L.DomEvent.stopPropagation)
                .on(link, 'click', function(){
                    // Open
                    this._animate(this._menu, frominit, 0, true, ispx, unit);
                }, this)
                .on(closeButton, 'click', L.DomEvent.stopPropagation)
                .on(closeButton, 'click', function(){
                    // Close
                    this._animate(this._menu, 0, frominit, false, ispx, unit);
                }, this);
            L.DomEvent.on(this._menu, 'mouseover', function(){
                map.scrollWheelZoom.disable();
            });
            L.DomEvent.on(this._menu, 'mouseout', function(){
                map.scrollWheelZoom.enable();
            });
    
            if(this.options.hidden){
                this.hide();
            }
    
            return this._container;
        },
    
        onRemove: function(map){
            //Remove sliding menu from DOM
            map._container.removeChild(this._menu);
            delete this._menu;
        },
    
        setContents: function(innerHTML){
            this._innerHTML = innerHTML;
            this._contents.innerHTML = this._innerHTML;
        },
    
        _animate: function(menu, from, to, isOpen, ispx, unit){
            if(this._isHorizontal){
                if(this._isLeftPosition){
                    menu.style.left = from + (ispx ? 'px' : '%');
                }
                else{
                    menu.style.right = from + (ispx ? 'px' : '%');
                }
            }
            else{
                if(this._isTopPosition){
                    menu.style.top = from + (ispx ? 'px' : '%');
                }
                else{
                    menu.style.bottom = from + (ispx ? 'px' : '%');
                }
            }
    
            if(from != to){
                setTimeout(function(slideMenu){
                    var value = isOpen ? from + unit : from - unit;
                    slideMenu._animate(slideMenu._menu, value, to, isOpen, ispx, unit);
                }, parseInt(this.options.delay), this);
            }
            else{
                return;
            }
        },
    
        hide: function () {
            this._container.style.display = 'none';
        },
    
        show: function () {
            this._container.style.display = 'inherit';
        }
    });
    
    L.control.slideMenu = function(innerHTML, options) {
        return new L.Control.SlideMenu(innerHTML, options);
    };

    </script>
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

        function showMonumentos() {
            window.ReactNativeWebView.postMessage("show_monumentos");
        }

        function showLugares() {
            window.ReactNativeWebView.postMessage("show_lugares");
        }

        function showHoteis() {
            window.ReactNativeWebView.postMessage("show_hoteis");
        }
 
        let contentMenu = '<div style="text-align: center;">';
        contentMenu += '<div class="content d-grid gap-2"> <button type="button" class="btn btn-primary rounded-pill" onclick="showMonumentos()">Monumentos</button> </div>';
        contentMenu += '<div class="content d-grid gap-2"> <button type="button" class="btn btn-primary rounded-pill" onclick="showLugares()">Lugares turísticos</button> </div>';
        contentMenu += '<div class="content d-grid gap-2"> <button type="button" class="btn btn-primary rounded-pill" onClick="showHoteis()">Hoteis</button> </div>';
        contentMenu += '<div class="content d-grid gap-2"> <button type="button" class="btn btn-primary rounded-pill" onClick="showHoteis()">Hostais</button> </div>';
        contentMenu += '<div class="content d-grid gap-2"> <button type="button" class="btn btn-primary rounded-pill" onClick="showHoteis()">Aloxamentos</button> </div>';
        contentMenu += '<div class="content d-grid gap-2"> <button type="button" class="btn btn-primary rounded-pill" onClick="showHoteis()">Caravanas</button> </div>';
        contentMenu += '<div class="content d-grid gap-2"> <button type="button" class="btn btn-primary rounded-pill" onClick="showHoteis()">Vivendas</button> </div>';
        contentMenu += '<div class="content d-grid gap-2"> <button type="button" class="btn btn-primary rounded-pill" onClick="showHoteis()">Camping</button> </div>';
        contentMenu += '<div class="content d-grid gap-2"> <button type="button" class="btn btn-primary rounded-pill" onClick="showHoteis()">Moteis</button> </div>';
        contentMenu += '</div>';

        var slideMenu = L.control.slideMenu(contentMenu, {
            width: '50%',
            position: 'topright',
            delay: '20'
        }).addTo(myMap);

        var geojson = undefined;

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
                default:
                    break;

            }
        }

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
                        layer.bindPopup('<p>' + feature.properties.tipo + '</p>');
                    }
                    if (tipo) {
                        setIcon(layer, tipo);
                    }
                    layer.on('click', function (e) {
                        myMap.setView(e.latlng, 13);
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

    </script>

</body>

</html>
`

export default leaflet