var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var esri_sat = L.tileLayer( 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles © Esri - Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var map = L.map('map', {
	layers: [esri_sat,osm]
}).setView([53.5, -1], 8);
var layers = L.control.layers(
	{ 'Satellite': esri_sat, 'OpenStreetMap': osm },
	null,
	{position: 'topleft'}
).addTo( map );
map.on('click', e => {
   	console.log(e.latlng);
});
var projects = [];
var regions = {};
getFile( 'https://https://peteredwards.github.io/dc8-project-map/data/decarbon8-projects.json', function( data ) {
	var projects = JSON.parse(data);
    getFile( 'https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/eurostat/ew/nuts3.json', function( data ) {
	    var regions = JSON.parse(data);
        console.log(projects);
    });
});
function getFile( url, callback ) {
	const oReq = new XMLHttpRequest();
    oReq.addEventListener( 'load', function() {
        callback( this.responseText );
    });
    oReq.open( "GET", url );
    oReq.send();
}
