const leaflet = `

<!DOCTYPE html>
<html>
<head>
	
	<title>Quick Start - Leaflet</title>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>

    <style>
    body {
        padding: 0;
        margin: 0;
    }
    html, body, #myMap {
        height: 100%;
        width: 100%;
    }
    </style>

	
</head>
<body>



<div id="myMap"></div>
<script>

    const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    var myMap = L.map('myMap').fitWorld();

    var tile = L.tileLayer(tilesProvider, {
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
    }).addTo(myMap);

    myMap.fitBounds([
        [42.928129720484264, -8.596746459275112],
        [42.93265446394879, -8.465597167120524],
        [42.843606832802664, -8.469888701549666],
        [42.84562062833106, -8.612024321842858]
    ]);

</script>

</body>
</html>
`

export default leaflet