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


   L.Control.Layers.include({
    getOverlays: function() {
      // create hash to hold all layers
      var control, layers;
      layers = {};
      control = this;
  
      // loop thru all layers in control
      control._layers.forEach(function(obj) {
        var layerName;
  
        // check if layer is an overlay
        if (obj.overlay) {
          // get name of overlay
          layerName = obj.name;
          // store whether it's present on the map or not
          return layers[layerName] = control._map.hasLayer(obj.layer);
        }
      });
  
      return layers;
    }
  });

 L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap2);



console.log ('starting shape file')

var shpfile = new L.Shapefile('./static/data/shapefiles/cb_2017_us_state_20m.zip', {
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
var shpfilecong = new L.Shapefile('./static/data/shapefiles/cb_2017_us_cd115_500k.zip', {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            console.log(feature.properties)
           layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
            }).join("<br />"), {
                maxHeight: 200
            })
           
        }
    }
});

var overlayMaps1 = {
    States: shpfile,
    Congress: shpfilecong
  };

 var clayer1 =  L.control.layers(overlayMaps1,null ).addTo(myMap1);

//Object.keys(feature.properties).map(function(k) {    return k + ": " + feature.properties[k];} ).join("<br />" 

var shpfile2 = new L.Shapefile('./static/data/shapefiles/cb_2017_us_state_20m.zip', {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            
<<<<<<< Updated upstream
            layer.bindPopup('State: ' + feature.properties.NAME + '<br>Land Area: '+Math.floor(100 * feature.properties.ALAND / (feature.properties.ALAND + feature.properties.AWATER))  + '%<br><div class="selectstate" name="' + feature.properties.STUSPS + '">See Charts for this State</div><br>'), {
=======
            layer.bindPopup('<div class="selectstate" name="' + feature.properties.STUSPS + '">SELNICK</div><br>'), {
>>>>>>> Stashed changes
                maxHeight: 200
            }
            
        }
    }
});
shpfile2.addTo(myMap2);

var shpfilecong2 = new L.Shapefile('./static/data/shapefiles/cb_2017_us_cd115_500k.zip', {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
            }).join("<br />") , {
                maxHeight: 200
            }).on('click', function() { alert('Clicked on a member of the group!'); })
     
        }
    }
});


var overlayMaps2 = {
    States: shpfile2,
    Congress: shpfilecong2
  };


var clayer2 = new L.control.layers(overlayMaps2, null).addTo(myMap2);

var selectedlayers2 = clayer2.getOverlays()
/* d3.select('#map2').select('.leaflet-control-layers-overlays')
.selectAll('.leaflet-control-layers-toggle')
.on('change', _d => {
    console.log(selectedlayers2)
   if (selectedlayers2.States) {
    if (clayer2.getOverlays().Congress) {
        console.log('in congresschecked')
        shpfile2.removeFrom(myMap2)
        selectedlayers2 = clayer2.getOverlays()
    }

   }
   else
   {
    if (clayer2.getOverlays().States) {
        console.log('in statechecked')
        shpfilecong2.removeFrom(myMap2)
        selectedlayers2 = clayer2.getOverlays()
    }
   }
   console.log(selectedlayers2)
})*/

myMap2.on('baselayerchange', d => {
    console.log('in layer change')
    if (d.name==='Congress'){
        console.log('Congress')
        myMap1.addLayer(shpfilecong)
        myMap1.removeLayer(shpfile)
    }
    else {
        console.log('<> Congress')
        myMap1.addLayer(shpfile)
        myMap1.removeLayer(shpfilecong)
    }

})


myMap1.on('baselayerchange', d => {
    console.log('in layer change')
    if (d.name==='Congress'){
        console.log('Congress')
        myMap2.addLayer(shpfilecong2)
        myMap2.removeLayer(shpfile2)
    }
    else {
        console.log('<> Congress')
        myMap2.addLayer(shpfile2)
        myMap2.removeLayer(shpfilecong2)
    }

})



shpfile.once("data:loaded", function() {
    console.log("finished loaded shapefile");
});

shpfile2.once("data:loaded", function() {
    console.log("finished loaded shapefile");
});

$('#map2').on('click', '.selectstate', function() {
<<<<<<< Updated upstream
   
   buildCharts(d3.select(this).attr('name'), 'pie2')
=======
   console.log(d3.select(this).attr('name'))
   buildCharts(d3.select(this).attr('name'))
>>>>>>> Stashed changes
  });

console.log ('done')