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
 
myMap1.touchZoom.disable();
myMap1.doubleClickZoom.disable();
myMap1.scrollWheelZoom.disable();
myMap1.boxZoom.disable();
myMap1.keyboard.disable();
var myMap2 = L.map("map2", {
    center: [37.09, -95.71],
    zoom: 4,
   });
   myMap2.touchZoom.disable();
   myMap2.doubleClickZoom.disable();
   myMap2.scrollWheelZoom.disable();
   myMap2.boxZoom.disable();
   myMap2.keyboard.disable();
   
   

 L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap2);

var shpfile = new L.Shapefile('./static/data/shapefiles/cb_2017_us_state_20m.zip', {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
             
                layer.bindPopup('State: ' + feature.properties.NAME + '<br>Land Area: '+Math.floor(100 * feature.properties.ALAND / (feature.properties.ALAND + feature.properties.AWATER))  + '%<br><div class="selectstate" name="' + feature.properties.STUSPS + '">See Charts for this State</div><br>'), {
                    maxHeight: 200
                
            }
        }
    }
});
shpfile.addTo(myMap1);




    var shpfilecong = L.geoJSON();
    d3.json('./static/data/geojson/us-115th-congress-members.geojson').then(data => {
        var myfeatures = []
        console.log('in my feature')
        data.features.forEach(feature => {
            if (feature.properties.rep_sen === 'Representative'){
                myfeatures.push(feature)
            }
        })
        var newfeature = {
            "type": "FeatureCollection",
            "features":myfeatures
        }
    
     shpfilecong = L.geoJSON(newfeature,{
        onEachFeature: function(feature, layer) {
            //    console.log(feature.properties)
            if (feature.properties){
                if (feature.properties.rep_sen === 'Representative'){ 
                    layer.bindPopup("Representative Name: " + feature.properties.name + "<br>District: " + feature.properties.district + "<br>State: " 
                    + feature.properties.state_label + "<br>Political Party: " + feature.properties.party + "<br>URL: <a href ='" + feature.properties.url + "'>" 
                    + feature.properties.url + " </a>"  , {maxHeight: 200}).on('click', function() { console.log(feature.properties) })
            
                }
            }
        },
        style: function(feature) {
            return {
                color: "white",
                // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                fillColor: chooseColor(feature.properties.party),
                fillOpacity: 0.5,
                weight: 1.5
            };
        }
    })
           
        console.log('out my feature')
    
    })


var shpfilecong2 = L.geoJSON();

d3.json('./static/data/geojson/us-115th-congress-members.geojson').then(data2 => {
    console.log('in feature 2')
    var myfeatures2 = []
    data2.features.forEach(feature => {
        if (feature.properties.rep_sen === 'Representative'){
            myfeatures2.push(feature)
        }
    })
    var newfeature2 = {
        "type": "FeatureCollection",
        "features":myfeatures2
    }

     shpfilecong2 = L.geoJSON(newfeature2,{
        onEachFeature: function(feature, layer) {
          //  console.log(feature.properties)
            if (feature.properties){
                if (feature.properties.rep_sen === 'Representative'){ 
                    layer.bindPopup("Representative Name: " + feature.properties.name + "<br>District: " + feature.properties.district + "<br>State: " 
                    + feature.properties.state_label + "<br>Political Party: " + feature.properties.party + "<br>URL: <a href ='" + feature.properties.url + "'>" 
                    + feature.properties.url + " </a>"  , {maxHeight: 200}).on('click', function() { console.log(feature.properties) })
            
                }
            }
        },
        style: function(feature) {
            return {
              color: "white",
              // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
              fillColor: chooseColor(feature.properties.party),
              fillOpacity: 0.5,
              weight: 1.5
            };
        }
    })
    console.log('out my feature2')
})





var overlayMaps1 = {
    States: shpfile,
    Congress: shpfilecong
  };

 var clayer1 =  L.control.layers(overlayMaps1,null ).addTo(myMap1);


var shpfile2 = new L.Shapefile('./static/data/shapefiles/cb_2017_us_state_20m.zip', {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            
            layer.bindPopup('State: ' + feature.properties.NAME + '<br>Land Area: '+Math.floor(100 * feature.properties.ALAND / (feature.properties.ALAND + feature.properties.AWATER))  + '%<br><div class="selectstate" name="' + feature.properties.STUSPS + '">See Charts for this State</div><br>'), {
                maxHeight: 200
            }
            
        }
    }
});
shpfile2.addTo(myMap2);



var overlayMaps2 = {
    States: shpfile2,
    Congress: shpfilecong2
  };
  console.log(shpfilecong2)

var clayer2 = new L.control.layers(overlayMaps2, null).addTo(myMap2);

var selectedlayers2 = clayer2.getOverlays()

myMap2.on('baselayerchange', d => {
    console.log('in layer change')
    if (d.name==='Congress'){
        console.log('Congress')
        myMap2.addLayer(shpfilecong2)
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
        myMap1.addLayer(shpfilecong)
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
   State2 = d3.select(this).attr('name')
   buildCharts(d3.select(this).attr('name'), 'pie2')
  });


  
$('#map1').on('click', '.selectstate', function() {
    State1 = d3.select(this).attr('name')
    buildCharts(d3.select(this).attr('name'), 'pie')
   });
 
console.log ('done')


function SelectorChanged(NewPieType) {
    // Fetch new data each time a new sample is selected
  PieType = NewPieType;
    if (State1 != ''){
        
        Pieurl = 
        buildCharts(State1,'pie')
    }
    if (State2 != ''){
        buildCharts(State2,'pie2')
    }
  }
  
  function chooseColor(party) {
    switch (party) {
        case "Republican":
        return "red";
      case "Democratic":
        return "blue";
      default:
        return "black";
      }
    }