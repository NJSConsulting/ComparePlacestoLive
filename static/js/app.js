function buildCharts(state,updatediv) {
var url = `./${state}`;
Plotly.newPlot(updatediv);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    d3.json(url).then(function(data) {  
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
          type: 'pie'
        }];
  
        Plotly.newPlot(updatediv, data, layout);
  
      });
    }
