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
    LoadLayers(newfeature)
})

function LoadLayers(congressgeojson){
    var shpfilecong = L.geoJSON(congressgeojson,{
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
    var shpfilecong2 = L.geoJSON(congressgeojson,{
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
    LoadShapeFiles1(shpfilecong, shpfilecong2)

}

function LoadShapeFiles1(Map1Cong, Map2Cong){
    var shpfile = new L.Shapefile('./static/data/shapefiles/cb_2017_us_state_20m.zip', {
        onEachFeature: function(feature, layer) {
            if (feature.properties) {
                 
                    layer.bindPopup('State: ' + feature.properties.NAME + '<br>Land Area: '+Math.floor(100 * feature.properties.ALAND / (feature.properties.ALAND + feature.properties.AWATER))  + '%<br><div class="selectstate" name="' + feature.properties.STUSPS + '">See Charts for this State</div><br>'), {
                        maxHeight: 200
                    
                }
            }
        }
    });
    shpfile.once("data:loaded", function() {
        console.log("finished loaded shapefile1");
        LoadShapeFiles2(Map1Cong, Map2Cong, shpfile)
    });
   

}
 

function LoadShapeFiles2(Map1Cong, Map2Cong, Map1State){
    console.log('In Load2')
    var shpfile2 = new L.Shapefile('./static/data/shapefiles/cb_2017_us_state_20m.zip', {
        onEachFeature: function(feature, layer) {
            if (feature.properties) {
                 
                    layer.bindPopup('State: ' + feature.properties.NAME + '<br>Land Area: '+Math.floor(100 * feature.properties.ALAND / (feature.properties.ALAND + feature.properties.AWATER))  + '%<br><div class="selectstate" name="' + feature.properties.STUSPS + '">See Charts for this State</div><br>'), {
                        maxHeight: 200
                    
                }
            }
        }
    });
    shpfile2.once("data:loaded", function() {
        console.log("finished loaded shapefile2");
        LoadMaps(Map1Cong, Map2Cong,Map1State, shpfile2 )
    });


}
 

function LoadMaps(Map1Cong, Map2Cong,Map1State,Map2State){
    

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
        zoom: 4
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

    var overlayMaps1 = {
        States: Map1State,
        Congress: Map1Cong
    };
    
    var clayer1 =  L.control.layers(overlayMaps1,null ).addTo(myMap1);

    var overlayMaps2 = {
        States: Map2State,
        Congress: Map2Cong
    };

    Map1State.addTo(myMap1)
    Map2State.addTo(myMap2)



    
    var clayer2 = new L.control.layers(overlayMaps2, null).addTo(myMap2);
    


    var selectedlayers2 = clayer2.getOverlays()
    


    myMap2.on('baselayerchange', d => {
        console.log('in layer change')
        if (d.name==='Congress'){
         //   console.log('Congress')
         //   myMap2.addLayer(shpfilecong2)
            myMap1.addLayer(Map1Cong)
            myMap1.removeLayer(Map1State)
        }
        else {
            console.log('<> Congress')
            myMap1.addLayer(Map1State)
            myMap1.removeLayer(Map1Cong)
        }
    
    })


    myMap1.on('baselayerchange', d => {
        console.log('in layer change')
        if (d.name==='Congress'){
        //    console.log('Congress')
        //    myMap1.addLayer(shpfilecong)
            myMap2.addLayer(Map2Cong)
            myMap2.removeLayer(Map2State)
        }
        else {
        //    console.log('<> Congress')
            myMap2.addLayer(Map2State)
            myMap2.removeLayer(Map2Cong)
        }
    
    })
    




    $('#map2').on('click', '.selectstate', function() {
        State2 = d3.select(this).attr('name')
        buildCharts(d3.select(this).attr('name'), 'pie2')
       });
     
     
       
     $('#map1').on('click', '.selectstate', function() {
         State1 = d3.select(this).attr('name')
         buildCharts(d3.select(this).attr('name'), 'pie')
        });
}








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