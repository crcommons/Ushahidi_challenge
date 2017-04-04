# Ushahidi_challenge
Ushahidi Coding Challenge

This project maps data from NGO project in Kenya. All data is clustered. Individual markers display project title, description, and objectives.
Uses leaflet.js and vanilla javascript.

#To run: 
Download repo and simply open index.html in the browser.

#Approach:
I chose leaflet.js because it was simple to interact with the data on the frontend, rather than using mapbox gl js which would have required that the data be hard-coded or hosted externally or locally on a server. leaflet.js allowed the geoJSON to be referenced with a variable. 

I used the leaflet clustering plugin because it was straightforward and simple to implement (after I realized I was using an old version!).

As I was already iterating through the entire geoJSON object, I decided to create a storage object for the county names for each NGO project.By creating a storage object (rather than an array) I have constant lookup every time I incremenet the count for a specific county. With the alternative (using an array), I would have had to push the county name to the array for each feature and then counted each time a county was in the array. This would have been very costly.

I decided to use jQuery for the filtering functionality because overall the UI is quite basic. If I were to expand the UI significantly, I would refactor the code to use React.js or Angular.js.

Credit:
leaflet.js tutorials
-http://leafletjs.com/examples/quick-start/
-http://leafletjs.com/examples/choropleth/
https://github.com/Leaflet/Leaflet.markercluster/blob/master/example/geojson.html
