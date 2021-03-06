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

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
        crossorigin="anonymous"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <style>
        .leaflet-bar button,
        .leaflet-bar button:hover {
            background-color: #fff;
            border: none;
            border-bottom: 1px solid #ccc;
            width: 26px;
            height: 26px;
            line-height: 26px;
            display: block;
            text-align: center;
            text-decoration: none;
            color: black;
        }

        .leaflet-bar button {
            background-position: 50% 50%;
            background-repeat: no-repeat;
            overflow: hidden;
            display: block;
        }

        .leaflet-bar button:hover {
            background-color: #f4f4f4;
        }

        .leaflet-bar button:first-of-type {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }

        .leaflet-bar button:last-of-type {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            border-bottom: none;
        }

        .leaflet-bar.disabled,
        .leaflet-bar button.disabled {
            cursor: default;
            pointer-events: none;
            opacity: .4;
        }

        .easy-button-button .button-state {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
        }


        .leaflet-touch .leaflet-bar button {
            width: 30px;
            height: 30px;
            line-height: 30px;
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

        (function () {
            L.Control.EasyBar = L.Control.extend({

                options: {
                    position: 'topright',  // part of leaflet's defaults
                    id: null,       // an id to tag the Bar with
                    leafletClasses: true        // use leaflet classes?
                },


                initialize: function (buttons, options) {

                    if (options) {
                        L.Util.setOptions(this, options);
                    }

                    this._buildContainer();
                    this._buttons = [];

                    for (var i = 0; i < buttons.length; i++) {
                        buttons[i]._bar = this;
                        buttons[i]._container = buttons[i].button;
                        this._buttons.push(buttons[i]);
                        this.container.appendChild(buttons[i].button);
                    }

                },


                _buildContainer: function () {
                    this._container = this.container = L.DomUtil.create('div', '');
                    this.options.leafletClasses && L.DomUtil.addClass(this.container, 'leaflet-bar easy-button-container leaflet-control');
                    this.options.id && (this.container.id = this.options.id);
                },


                enable: function () {
                    L.DomUtil.addClass(this.container, 'enabled');
                    L.DomUtil.removeClass(this.container, 'disabled');
                    this.container.setAttribute('aria-hidden', 'false');
                    return this;
                },


                disable: function () {
                    L.DomUtil.addClass(this.container, 'disabled');
                    L.DomUtil.removeClass(this.container, 'enabled');
                    this.container.setAttribute('aria-hidden', 'true');
                    return this;
                },


                onAdd: function () {
                    return this.container;
                },

                addTo: function (map) {
                    this._map = map;

                    for (var i = 0; i < this._buttons.length; i++) {
                        this._buttons[i]._map = map;
                    }

                    var container = this._container = this.onAdd(map),
                        pos = this.getPosition(),
                        corner = map._controlCorners[pos];

                    L.DomUtil.addClass(container, 'leaflet-control');

                    if (pos.indexOf('bottom') !== -1) {
                        corner.insertBefore(container, corner.firstChild);
                    } else {
                        corner.appendChild(container);
                    }

                    return this;
                }

            });

            L.easyBar = function () {
                var args = [L.Control.EasyBar];
                for (var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
                return new (Function.prototype.bind.apply(L.Control.EasyBar, args));
            };

            // L.EasyButton is the actual buttons
            // can be called without being grouped into a bar
            L.Control.EasyButton = L.Control.extend({

                options: {
                    position: 'topright',       // part of leaflet's defaults

                    id: null,            // an id to tag the button with

                    type: 'replace',       // [(replace|animate)]
                    // replace swaps out elements
                    // animate changes classes with all elements inserted

                    states: [],              // state names look like this
                    // {
                    //   stateName: 'untracked',
                    //   onClick: function(){ handle_nav_manually(); };
                    //   title: 'click to make inactive',
                    //   icon: 'fa-circle',    // wrapped with <a>
                    // }

                    leafletClasses: true,     // use leaflet styles for the button
                    tagName: 'button',
                },



                initialize: function (icon, onClick, title, id) {

                    // clear the states manually
                    this.options.states = [];

                    // add id to options
                    if (id != null) {
                        this.options.id = id;
                    }

                    // storage between state functions
                    this.storage = {};

                    // is the last item an object?
                    if (typeof arguments[arguments.length - 1] === 'object') {

                        // if so, it should be the options
                        L.Util.setOptions(this, arguments[arguments.length - 1]);
                    }

                    // if there aren't any states in options
                    // use the early params
                    if (this.options.states.length === 0 &&
                        typeof icon === 'string' &&
                        typeof onClick === 'function') {

                        // turn the options object into a state
                        this.options.states.push({
                            icon: icon,
                            onClick: onClick,
                            title: typeof title === 'string' ? title : ''
                        });
                    }

                    // curate and move user's states into
                    // the _states for internal use
                    this._states = [];

                    for (var i = 0; i < this.options.states.length; i++) {
                        this._states.push(new State(this.options.states[i], this));
                    }

                    this._buildButton();

                    this._activateState(this._states[0]);

                },

                _buildButton: function () {

                    this.button = L.DomUtil.create(this.options.tagName, '');

                    if (this.options.tagName === 'button') {
                        this.button.setAttribute('type', 'button');
                    }

                    if (this.options.id) {
                        this.button.id = this.options.id;
                    }

                    if (this.options.leafletClasses) {
                        L.DomUtil.addClass(this.button, 'easy-button-button leaflet-bar-part leaflet-interactive');
                    }

                    // don't let double clicks and mousedown get to the map
                    L.DomEvent.addListener(this.button, 'dblclick', L.DomEvent.stop);
                    L.DomEvent.addListener(this.button, 'mousedown', L.DomEvent.stop);
                    L.DomEvent.addListener(this.button, 'mouseup', L.DomEvent.stop);

                    // take care of normal clicks
                    L.DomEvent.addListener(this.button, 'click', function (e) {
                        L.DomEvent.stop(e);
                        this._currentState.onClick(this, this._map ? this._map : null);
                        this._map && this._map.getContainer().focus();
                    }, this);

                    // prep the contents of the control
                    if (this.options.type == 'replace') {
                        this.button.appendChild(this._currentState.icon);
                    } else {
                        for (var i = 0; i < this._states.length; i++) {
                            this.button.appendChild(this._states[i].icon);
                        }
                    }
                },


                _currentState: {
                    // placeholder content
                    stateName: 'unnamed',
                    icon: (function () { return document.createElement('span'); })()
                },



                _states: null, // populated on init



                state: function (newState) {

                    // when called with no args, it's a getter
                    if (arguments.length === 0) {
                        return this._currentState.stateName;
                    }

                    // activate by name
                    if (typeof newState == 'string') {

                        this._activateStateNamed(newState);

                        // activate by index
                    } else if (typeof newState == 'number') {

                        this._activateState(this._states[newState]);
                    }

                    return this;
                },


                _activateStateNamed: function (stateName) {
                    for (var i = 0; i < this._states.length; i++) {
                        if (this._states[i].stateName == stateName) {
                            this._activateState(this._states[i]);
                        }
                    }
                },

                _activateState: function (newState) {

                    if (newState === this._currentState) {

                        // don't touch the dom if it'll just be the same after
                        return;

                    } else {

                        // swap out elements... if you're into that kind of thing
                        if (this.options.type == 'replace') {
                            this.button.appendChild(newState.icon);
                            this.button.removeChild(this._currentState.icon);
                        }

                        if (newState.title) {
                            this.button.title = newState.title;
                        } else {
                            this.button.removeAttribute('title');
                        }

                        // update classes for animations
                        for (var i = 0; i < this._states.length; i++) {
                            L.DomUtil.removeClass(this._states[i].icon, this._currentState.stateName + '-active');
                            L.DomUtil.addClass(this._states[i].icon, newState.stateName + '-active');
                        }

                        // update classes for animations
                        L.DomUtil.removeClass(this.button, this._currentState.stateName + '-active');
                        L.DomUtil.addClass(this.button, newState.stateName + '-active');

                        // update the record
                        this._currentState = newState;

                    }
                },

                enable: function () {
                    L.DomUtil.addClass(this.button, 'enabled');
                    L.DomUtil.removeClass(this.button, 'disabled');
                    this.button.setAttribute('aria-hidden', 'false');
                    return this;
                },

                disable: function () {
                    L.DomUtil.addClass(this.button, 'disabled');
                    L.DomUtil.removeClass(this.button, 'enabled');
                    this.button.setAttribute('aria-hidden', 'true');
                    return this;
                },

                onAdd: function (map) {
                    var bar = L.easyBar([this], {
                        position: this.options.position,
                        leafletClasses: this.options.leafletClasses
                    });
                    this._anonymousBar = bar;
                    this._container = bar.container;
                    return this._anonymousBar.container;
                },

                removeFrom: function (map) {
                    if (this._map === map)
                        this.remove();
                    return this;
                },

            });

            L.easyButton = function (/* args will pass automatically */) {
                var args = Array.prototype.concat.apply([L.Control.EasyButton], arguments);
                return new (Function.prototype.bind.apply(L.Control.EasyButton, args));
            };

            /*************************
             *
             * util functions
             *
             *************************/

            // constructor for states so only curated
            // states end up getting called
            function State(template, easyButton) {

                this.title = template.title;
                this.stateName = template.stateName ? template.stateName : 'unnamed-state';

                // build the wrapper
                this.icon = L.DomUtil.create('span', '');

                L.DomUtil.addClass(this.icon, 'button-state state-' + this.stateName.replace(/(^\s*|\s*$)/g, ''));
                this.icon.innerHTML = buildIcon(template.icon);
                this.onClick = L.Util.bind(template.onClick ? template.onClick : function () { }, easyButton);
            }

            function buildIcon(ambiguousIconString) {

                var tmpIcon;

                // does this look like html? (i.e. not a class)
                if (ambiguousIconString.match(/[&;=<>"']/)) {

                    // if so, the user should have put in html
                    // so move forward as such
                    tmpIcon = ambiguousIconString;

                    // then it wasn't html, so
                    // it's a class list, figure out what kind
                } else {
                    ambiguousIconString = ambiguousIconString.replace(/(^\s*|\s*$)/g, '');
                    tmpIcon = L.DomUtil.create('span', '');

                    if (ambiguousIconString.indexOf('fa-') === 0) {
                        L.DomUtil.addClass(tmpIcon, 'fa ' + ambiguousIconString)
                    } else if (ambiguousIconString.indexOf('glyphicon-') === 0) {
                        L.DomUtil.addClass(tmpIcon, 'glyphicon ' + ambiguousIconString)
                    } else {
                        L.DomUtil.addClass(tmpIcon, /*rollwithit*/ ambiguousIconString)
                    }

                    // make this a string so that it's easy to set innerHTML below
                    tmpIcon = tmpIcon.outerHTML;
                }

                return tmpIcon;
            }

        })();
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
            'Est??ndar': standard,
            Transporte: transport,
            Humanitario: humanitarian,
            'Sin etiquetas': noLabels
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
                    var content = document.createElement("div");
                    content.style.cssText = 'text-align: center';
                    if (feature.properties.display_name === undefined && feature.properties.titulo !== null) {
                        const id = feature.properties.id;
                        const tipo = feature.properties.tipo;
                        if(tipo === "Lugar tur??stico") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.titulo+'</p><button type="button" class="btn btn-success" onclick="moreInfoLugares('+id+')">+ info</button>';
                        } else if(tipo === "Monumento") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.titulo+'</p><button type="button" class="btn btn-success" onclick="moreInfoMonumentos('+id+')">+ info</button>'
                        } else if(tipo === "Hospedaxe") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.titulo+'</p><button type="button" class="btn btn-success" onclick="moreInfoHospedaxe('+id+')">+ info</button>'
                        } else if(tipo === "Hostalar??a") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.titulo+'</p><button type="button" class="btn btn-success" onclick="moreInfoHostalaria('+id+')">+ info</button>'
                        } else if(tipo === "Ocio") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.titulo+'</p><button type="button" class="btn btn-success" onclick="moreInfoOcio('+id+')">+ info</button>'
                        } else if(tipo === "Outra") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.titulo+'</p><button type="button" class="btn btn-success" onclick="moreInfoOutras('+id+')">+ info</button>'
                        } else {
                            content.innerHTML='<p style="display: block;">'+feature.properties.display_name+'</p>'
                        }
                    } else if (feature.properties.display_name !== undefined) {
                        const id = feature.properties.id;
                        const tipo = feature.properties.tipo;
                        if(tipo === "Lugar tur??stico") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.display_name+'</p><button type="button" class="btn btn-success" onclick="moreInfoLugares('+id+')">+ info</button>';
                        } else if(tipo === "Monumento") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.display_name+'</p><button type="button" class="btn btn-success" onclick="moreInfoMonumentos('+id+')">+ info</button>'
                        } else if(tipo === "Hospedaxe") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.display_name+'</p><button type="button" class="btn btn-success" onclick="moreInfoHospedaxe('+id+')">+ info</button>'
                        } else if(tipo === "Hostalar??a") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.display_name+'</p><button type="button" class="btn btn-success" onclick="moreInfoHostalaria('+id+')">+ info</button>'
                        } else if(tipo === "Ocio") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.display_name+'</p><button type="button" class="btn btn-success" onclick="moreInfoOcio('+id+')">+ info</button>'
                        } else if(tipo === "Outra") {
                            content.innerHTML='<p style="display: block;">'+feature.properties.display_name+'</p><button type="button" class="btn btn-success" onclick="moreInfoOutras('+id+')">+ info</button>'
                        } else {
                            content.innerHTML='<p style="display: block;">'+feature.properties.display_name+'</p>'
                        }
                    } else {
                        const id = feature.properties.id;
                        const tipo = feature.properties.tipo;
                        if(tipo === "Lugar tur??stico") {
                            content.innerHTML='<p style="display: block;">'+traductor(feature.properties.sub_tag)+'</p><button type="button" class="btn btn-success" onclick="moreInfoLugares('+id+')">+ info</button>';
                        } else if(tipo === "Monumento") {
                            content.innerHTML='<p style="display: block;">'+traductor(feature.properties.sub_tag)+'</p><button type="button" class="btn btn-success" onclick="moreInfoMonumentos('+id+')">+ info</button>'
                        } else if(tipo === "Hospedaxe") {
                            content.innerHTML='<p style="display: block;">'+traductor(feature.properties.sub_tag)+'</p><button type="button" class="btn btn-success" onclick="moreInfoHospedaxe('+id+')">+ info</button>'
                        } else if(tipo === "Hostalar??a") {
                            content.innerHTML='<p style="display: block;">'+traductor(feature.properties.sub_tag)+'</p><button type="button" class="btn btn-success" onclick="moreInfoHostalaria('+id+')">+ info</button>'
                        } else if(tipo === "Ocio") {
                            content.innerHTML='<p style="display: block;">'+traductor(feature.properties.sub_tag)+'</p><button type="button" class="btn btn-success" onclick="moreInfoOcio('+id+')">+ info</button>'
                        } else if(tipo === "Outra") {
                            content.innerHTML='<p style="display: block;">'+traductor(feature.properties.sub_tag)+'</p><button type="button" class="btn btn-success" onclick="moreInfoOutras('+id+')">+ info</button>'
                        } else {
                            content.innerHTML='<p style="display: block;">'+feature.properties.display_name+'</p>'
                        }
                    }
                    layer.bindPopup(content);
                    if(feature.properties.sub_tag) {
                        setIcon(layer, feature.properties.sub_tag);
                    } else {
                        setIcon(layer, feature.properties.tipo);
                    }
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

        var user = undefined;
        function addMarker(lat, lang) {
            if (user != undefined) {
                myMap.removeLayer(user);
                user = undefined;
            }
            user = L.marker([lat, lang], {
                icon: userMarker
            }).addTo(myMap);
            myMap.setView([lat, lang], 13);
        }

        L.easyButton('fa-location-arrow', function(btn, map){
            window.ReactNativeWebView.postMessage("location");
        }).addTo(myMap);

        L.easyButton('fa-compress-arrows-alt', function(btn, map){
            map.setView([42.88078486209454, -8.544641203634002], 13);
        }).addTo(myMap);

        L.easyButton('fa-trash', function(btn, map){
            if (geojson != undefined) {
                myMap.removeLayer(geojson);
                geojson = undefined;
            }
            if (user != undefined) {
                myMap.removeLayer(user);
                user = undefined;
            }
        }).addTo(myMap);

        L.easyButton('fa-caret-square-up', function(btn, map){
            window.ReactNativeWebView.postMessage("menu");
        }).addTo(myMap);

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

        let monumentoMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-landmark',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let lugarMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'red',
            prefix: 'fa',
            icon: 'fa-landmark',
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
            markerColor: 'blue',
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
            markerColor: 'green',
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
            markerColor: 'orange',
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
            markerColor: 'red',
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
            markerColor: 'red',
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
            markerColor: 'yellow',
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
            markerColor: 'pink',
            prefix: 'fa',
            icon: 'fa-ice-cream',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let pasteleriaMarker = L.ExtraMarkers.icon({
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

        let picnicMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'red',
            prefix: 'fa',
            icon: 'fa-apple-alt',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let arcadeMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'grey',
            prefix: 'fa',
            icon: 'fa-gamepad',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let boleraMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-bowling-ball',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let escapeRoomMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-users',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let xardinMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'green',
            prefix: 'fa',
            icon: 'fa-leaf',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let parkMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'green',
            prefix: 'fa',
            icon: 'fa-leaf',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let playgroundMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'green',
            prefix: 'fa',
            icon: 'fa-shapes',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let stadiumMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'orange',
            prefix: 'fa',
            icon: 'fa-futbol',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let elasticasMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'purple',
            prefix: 'fa',
            icon: 'fa-grin-squint-tears',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let pitchMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'orange',
            prefix: 'fa',
            icon: 'fa-futbol',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let centroDeportivoMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'orange',
            prefix: 'fa',
            icon: 'fa-futbol',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let terrazaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'purple',
            prefix: 'fa',
            icon: 'fa-umbrella-beach',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let baileMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'purple',
            prefix: 'fa',
            icon: 'fa-music',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let pabellonMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'yellow',
            prefix: 'fa',
            icon: 'fa-futbol',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let cineMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'cyan',
            prefix: 'fa',
            icon: 'fa-film',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let teatroMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'cyan',
            prefix: 'fa',
            icon: 'fa-theater-masks',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let clubMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'pink',
            prefix: 'fa',
            icon: 'fa-glass-martini-alt',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let miradorMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'yellow',
            prefix: 'fa',
            icon: 'fa-binoculars',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let bancoMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-piggy-bank',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let farmaciaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'green',
            prefix: 'fa',
            icon: 'fa-prescription-bottle-alt',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let correosMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'yellow',
            prefix: 'fa',
            icon: 'fa-mail-bulk',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let taxiMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'yellow',
            prefix: 'fa',
            icon: 'fa-taxi',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let policiaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-exclamation',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let parkingMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-parking',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let caixeiroMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'orange',
            prefix: 'fa',
            icon: 'fa-credit-card',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let ba??osMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'cyan',
            prefix: 'fa',
            icon: 'fa-toilet',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let superMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'purple',
            prefix: 'fa',
            icon: 'fa-shopping-basket',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let superPequeMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'purple',
            prefix: 'fa',
            icon: 'fa-shopping-basket',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let pescaderiaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'red',
            prefix: 'fa',
            icon: 'fa-fish',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let carniceriaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'red',
            prefix: 'fa',
            icon: 'fa-drumstick-bite',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let roupaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-tshirt',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let regaloMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'green',
            prefix: 'fa',
            icon: 'fa-gift',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let zapatoMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-shoe-prints',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let bebidasMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'orange',
            prefix: 'fa',
            icon: 'fa-wine-bottle',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let bolsaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-shopping-bag',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let almacenesMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'green',
            prefix: 'fa',
            icon: 'fa-building',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let perfumeriaMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'cyan',
            prefix: 'fa',
            icon: 'fa-store-alt',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let infoMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'grey',
            prefix: 'fa',
            icon: 'fa-info',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let clinicMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-clinic-medical',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        let fotoMarker = L.ExtraMarkers.icon({
            shape: 'circle',
            markerColor: 'blue',
            prefix: 'fa',
            icon: 'fa-camera',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
        });

        const moreInfoLugares = (id) => {
            window.ReactNativeWebView.postMessage("info:"+id+":lugar");
        }

        const moreInfoMonumentos = (id) => {
            window.ReactNativeWebView.postMessage("info:"+id+":monumento");
        }

        const moreInfoHospedaxe = (id) => {
            window.ReactNativeWebView.postMessage("info:"+id+":hospedaxe");
        }

        const moreInfoHostalaria = (id) => {
            window.ReactNativeWebView.postMessage("info:"+id+":hostalaria");
        }

        const moreInfoOcio = (id) => {
            window.ReactNativeWebView.postMessage("info:"+id+":ocio");
        }

        const moreInfoOutras = (id) => {
            window.ReactNativeWebView.postMessage("info:"+id+":outra");
        }

        function setIcon(layer, tipo) {
            switch (tipo) {
                case "Lugar tur??stico":
                    layer.setIcon(lugarMarker);
                    break;
                case "Monumento":
                    layer.setIcon(monumentoMarker);
                    break;
                case "hotel":
                    layer.setIcon(hotelMarker);
                    break;
                case "hostel":
                    layer.setIcon(hostalMarker);
                    break;
                case "guest_house":
                    layer.setIcon(aloxamentoMarker);
                    break;
                case "motel":
                    layer.setIcon(motelMarker);
                    break;
                case "camp_pitch":
                    layer.setIcon(campingMarker);
                    break;
                case "camp_site":
                    layer.setIcon(campingMarker);
                    break;
                case "caravan_site":
                    layer.setIcon(caravanMarker);
                    break;
                case "apartment":
                    layer.setIcon(vivendaMarker);
                    break;
                case "bar":
                    layer.setIcon(barMarker);
                    break;
                case "restaurant":
                    layer.setIcon(restauranteMarker);
                    break;
                case "cafe":
                    layer.setIcon(cafeMarker);
                    break;
                case "pub":
                    layer.setIcon(pubMarker);
                    break;
                case "food_court":
                    layer.setIcon(zonaComidasMarker);
                    break;
                case "fast_food":
                    layer.setIcon(comidaRapidaMarker);
                    break;
                case "ice_cream":
                    layer.setIcon(xeaderiaMarker);
                    break;
                case "confectionery":
                    layer.setIcon(pasteleriaMarker);
                    break;
                case "bakery":
                    layer.setIcon(panaderiaMarker);
                    break;
                case "chocolate":
                    layer.setIcon(chocolateMarker);
                    break;
                case "picnic_table":
                    layer.setIcon(picnicMarker);
                    break;
                case "picnic_site":
                    layer.setIcon(picnicMarker);
                    break;
                case "amusement_arcade":
                    layer.setIcon(arcadeMarker);
                    break;
                case "bowling_alley":
                    layer.setIcon(boleraMarker);
                    break;
                case "escape_game":
                    layer.setIcon(escapeRoomMarker);
                    break;
                case "park":
                    layer.setIcon(parkMarker);
                    break;
                case "garden":
                    layer.setIcon(xardinMarker);
                    break;
                case "playground":
                    layer.setIcon(playgroundMarker);
                    break;
                case "stadium":
                    layer.setIcon(stadiumMarker);
                    break;
                case "trampoline_park":
                    layer.setIcon(elasticasMarker);
                    break;
                case "pitch":
                    layer.setIcon(pitchMarker);
                    break;
                case "sports_centre":
                    layer.setIcon(centroDeportivoMarker);
                    break;
                case "outdoor_seating":
                    layer.setIcon(terrazaMarker);
                    break;
                case "dance":
                    layer.setIcon(baileMarker);
                    break;
                case "sports_hall":
                    layer.setIcon(pabellonMarker);
                    break;
                case "cinema":
                    layer.setIcon(cineMarker);
                    break;
                case "theatre":
                    layer.setIcon(teatroMarker);
                    break;
                case "nightclub":
                    layer.setIcon(clubMarker);
                    break;
                case "viewpoint":
                    layer.setIcon(miradorMarker);
                    break;
                case "bank":
                    layer.setIcon(bancoMarker);
                    break;
                case "pharmacy":
                    layer.setIcon(farmaciaMarker);
                    break;
                case "post_office":
                    layer.setIcon(correosMarker);
                    break;
                case "taxi":
                    layer.setIcon(taxiMarker);
                    break;
                case "police":
                    layer.setIcon(policiaMarker);
                    break;
                case "bicycle_parking":
                    layer.setIcon(parkingMarker);
                    break;
                case "atm":
                    layer.setIcon(caixeiroMarker);
                    break;
                case "toilets":
                    layer.setIcon(ba??osMarker);
                    break;
                case "supermarket":
                    layer.setIcon(superMarker);
                    break;
                case "convenience":
                    layer.setIcon(superPequeMarker);
                    break;
                case "seafood":
                    layer.setIcon(pescaderiaMarker);
                    break;
                case "butcher":
                    layer.setIcon(carniceriaMarker);
                    break;
                case "clothes":
                    layer.setIcon(roupaMarker);
                    break;
                case "gift":
                    layer.setIcon(regaloMarker);
                    break;
                case "shoes":
                    layer.setIcon(zapatoMarker);
                    break;
                case "beverages":
                    layer.setIcon(bebidasMarker);
                    break;
                case "department_store":
                    layer.setIcon(almacenesMarker);
                    break;
                case "bag":
                    layer.setIcon(bolsaMarker);
                    break;
                case "perfumery":
                    layer.setIcon(perfumeriaMarker);
                    break;
                case "information":
                    layer.setIcon(infoMarker);
                    break;
                case "hospital":
                    layer.setIcon(hospitalMarker);
                    break;
                case "clinic":
                    layer.setIcon(clinicMarker);
                    break;
                case "photo":
                    layer.setIcon(fotoMarker);
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
                    return "Caf??";
                case "pub":
                    return "Pub";
                case "food_court":
                    return "Zona de comidas";
                case "fast_food":
                    return "Comida r??pida";
                case "ice_cream":
                    return "Xeader??a";
                case "confectionery":
                    return "Pasteler??a";
                case "bakery":
                    return "Panader??a";
                case "chocolate":
                    return "Chocolater??a";
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
                    return "Xard??n";
                case "park":
                    return "Parque";
                case "playground":
                    return "Parque infantil";
                case "stadium":
                    return "Estadio";
                case "trampoline_park":
                    return "Parque de camas el??sticas";
                case "pitch":
                    return "Zona de deportes ao aire libre";
                case "sports_centre":
                    return "Centro deportivo";
                case "outdoor_seating":
                    return "Terraza";
                case "dance":
                    return "Baile";
                case "sports_hall":
                    return "Pabell??n deportivo";
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
                    return "Polic??a";
                case "bicycle_parking":
                    return "Parking de bicicletas";
                case "atm":
                    return "Caixeiro";
                case "toilets":
                    return "Ba??os p??blicos";
                case "supermarket":
                    return "Supermercado";
                case "convenience":
                    return "Pequeno supermercado";
                case "seafood":
                    return "Pescader??a";
                case "butcher":
                    return "Carnicer??a";
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
                    return "Perfumer??a";
                case "information":
                    return "Punto de informaci??n";
                case "hospital":
                    return "Hospital";
                case "clinic":
                    return "Cl??nica";
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