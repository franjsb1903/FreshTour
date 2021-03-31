const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

var mymap = L.map('mapid');

L.tileLayer(tilesProvider, {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(mymap);

mymap.fitBounds([
	[42.928129720484264, -8.596746459275112],
	[42.93265446394879, -8.465597167120524],
	[42.843606832802664, -8.469888701549666],
	[42.84562062833106, -8.612024321842858]
]);