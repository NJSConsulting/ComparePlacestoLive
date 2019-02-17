

var State1 = '';
var State2 = '';

function buildCharts(state, updatediv) {
console.log(d3.select('#selDataset').node().value)
var PieUrls = {
  "Taxes":`./${state}`,
  "Race":`./${state}/race`,
  "Gender":`./${state}/gender`,
  "Occupation":`./${state}/occupation`,
  "Sector":`./${state}/sector`
}
var Pieurl = PieUrls[d3.select('#selDataset').node().value];

Plotly.newPlot(updatediv);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    d3.json(Pieurl).then(function(data) {  
      var pie_values = Object.values(data.data);
      console.log(data)
      console.log(Object.values(data))
        var pie_labels = Object.keys(data.data);
        console.log(Object.keys(data))
        // var pie_hover = data.otu_labels.slice(0,10);
        var layout = {
          title: {
            text:data.Title
          }}

        var data = [{
          values: pie_values,
          labels: pie_labels,
        //   hovertext: pie_hover,
          type: 'pie',
          marker: {
            colors: pie_labels.map(choosePieColor)
          },
        }];
  
        Plotly.newPlot(updatediv, data, layout);
  
      });
    }
    
   function choosePieColor(label){
    switch (label) {
      case "% White":
        return "red";
      case "% Hispanic":
        return "brown";
      case "% Black":
        return "green";
      
      case "% Asian":
        return "yellow";
      case "% Native":
        return "blue";
      case "% Pacific":
        return "Orange";
        case "Take Home for 100K USD":
        return "green";
        case "Federal tax for 100K":
        return "red";
        case "Social Security tax for 100K":
        return "blue";
        case "Medicare Witheld for 100K":
        return "yellow";
        case "State tax for 100K":
        return "orange";
        case "% Women":
        return "pink";
        case "% Men":
        return "blue";
        case "% Professional":
        return "silver";
        case "% Office":
        return "grey";
        case "% Service":
        return "blue";
        case "% Production":
        return "green";
        case "% Construction":
        return "brown";
        case "% Private Sector":
        return "silver";
        case "% Public Sector":
        return "blue";
        case "% Self-Employed":
        return "green";
        case "% Family Work":
        return "red";
    default:
      return "black";
    }
   }