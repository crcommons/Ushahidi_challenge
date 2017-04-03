var tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY3Jjb21tb25zIiwiYSI6ImNqMHkyMTl5azAxZGwzMnJ0dnhzdDB0MnIifQ.B8LBIXcAON9g-uMk1XiIdw', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiY3Jjb21tb25zIiwiYSI6ImNqMHkyMTl5azAxZGwzMnJ0dnhzdDB0MnIifQ.B8LBIXcAON9g-uMk1XiIdw'
})

//CREATING A NEW MAP INSTANCE
var map = L.map('map')
  .setView([0.211433999999997, 35.395105], 7)
  .addLayer(tiles);

//OBJECT TO HOLD LIST/COUNT OF COUNTIES
var ngoCounties = {};
//CHECK EACH COUNTY AND ADD IT TO NGOCOUNTIES OBJECT
var countCounties = function(feature){
	var county = feature.properties.county
	if (ngoCounties[county]) {
		ngoCounties[county] = ngoCounties[county] + 1
	} else {
		ngoCounties[county] = 1
	}
}

//SET EITHER DEFAULT CONTENT OR PROJECT INFO FOR POPUPS
var setPopupContent = function(feature, layer){
	
	//SETTING DEFAULT POPUP TEXT BLANK IN CASE OF NULL DATA
	var contentTitle = '<h2>Oops! The project title is missing.</h2>';
	var contentDescription = '<p>Sorry, we don\'t have a description for this project</p>';
	var contentObjectives ='<p>Darn. The objectives are missing from our data.</p>';

	//IF DATA IS NOT NULL, THEN SET POPUP TEXT TO GEOJSON CONTENT
	if(feature.properties.project_title !== null){
	contentTitle = '<h2>' + feature.properties.project_title + '</h2>'
	}
	if(feature.properties.project_description !== null){
	contentDescription = '<p>Description: ' + feature.properties.project_description + 
	'</p>'
	}
	if(feature.properties.project_objectives !== null){
	contentObjectives = '<p>Objectives: ' + feature.properties.project_objectives + '</p>'
	}

	//SET AND BIND CONTENT TO POPUPS
	var content = contentTitle + contentDescription + contentObjectives;
	layer.bindPopup(content);
}

//FOR EACH NGO PROJECT
//RUN COUNTCOUNTIES AND SETPOPUPCONENT 
//WHEN ADDING THEM TO MAP LAYER
var onEachFeature = function(feature, layer) {
	countCounties(feature);
	setPopupContent(feature, layer);
}

//TAKES THE NUMBER OF PROJECTS IN ONE COUNTY AND RETURNS A COLOR
var getColor = function(number) {
  return number > 100 ? '#160016' :
         number > 75  ? '#380036' :
         number > 50  ? '#4d004b' :
         number > 40  ? '#810f7c' :
         number > 30   ? '#88419d' :
         number > 25   ? '#8c6bb1' :
         number > 20   ? '#8c96c6' :
         number > 15   ? '#9ebcda' :
         number > 10   ? '#bfd3e6' :
         number > 5   ? '#e0ecf4' :
         number > 0   ? '#f7fcfd' :
                    '';
}

//FOR EACH FEATURE (COUNTY)
//TAKES THE COUNTY NAME AND LOOKS UP THE COUNT 
//OF PROJECTS IN THAT COUNTY
//CALLS GETCOLOR FUNCTION TO RETURN COLOR
var colorByNumbers = function(feature){
	var county = feature.properties.COUNTY_NAM
	var totalProjects = ngoCounties[county]
	return getColor(totalProjects)
}

//A STYLING FUNCTION FOR THE COUNTY LAYER
var style = function(feature) {
  return {
    fillColor: colorByNumbers(feature),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

//CREATE CLUSTER
var markers = L.markerClusterGroup();

//CREATE POINTS
var geoJsonLayer = L.geoJSON(data, {onEachFeature: onEachFeature})

//ADD POINT TO MAP
L.geoJson(counties, {style: style}).addTo(map);

//ADD POINT LAYER TO CLUSTER
markers.addLayer(geoJsonLayer);

//ADD CLUSTER LAYER
map.addLayer(markers);
map.fitBounds(markers.getBounds());


 map.scrollWheelZoom.disable();