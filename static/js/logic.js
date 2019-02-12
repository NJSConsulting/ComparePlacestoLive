var myMap1 = L.map("map1", {
    center: [37.09, -95.71],
    zoom: 4
  });
 var baselayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap1);
 
var myMap2 = L.map("map2", {
    center: [37.09, -95.71],
    zoom: 4,
   });


 L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap2);



console.log ('starting shape file')

var shpfile = new L.Shapefile('../data/shapefiles/cb_2017_us_state_20m.zip', {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
            }).join("<br />"), {
                maxHeight: 200
            });
        }
    }
});
shpfile.addTo(myMap1);
var shpfilecong = new L.Shapefile('../data/shapefiles/cb_2017_us_cd115_500k.zip', {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
            }).join("<br />"), {
                maxHeight: 200
            });
        }
    }
});

var overlayMaps1 = {
    States: shpfile,
    Congress: shpfilecong
  };

 var clayer1 =  L.control.layers(null, overlayMaps1).addTo(myMap1);



var shpfile2 = new L.Shapefile('../data/shapefiles/cb_2017_us_state_20m.zip', {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
            }).join("<br />"), {
                maxHeight: 200
            });
        }
    }
});
shpfile2.addTo(myMap2);

var shpfilecong2 = new L.Shapefile('../data/shapefiles/cb_2017_us_cd115_500k.zip', {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
            }).join("<br />"), {
                maxHeight: 200
            });
        }
    }
});


var overlayMaps2 = {
    States: shpfile2,
    Congress: shpfilecong2
  };



var clayer2 = L.control.layers(null, overlayMaps2).addTo(myMap2);
clayer2.on('changed',_ => {
    console.log('clayer2changed')
})

shpfile.once("data:loaded", function() {
    console.log("finished loaded shapefile");
});

shpfile2.once("data:loaded", function() {
    console.log("finished loaded shapefile");
});


console.log ('done')