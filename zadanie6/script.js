trace1 = {
    x: [],
    y: [],
    mode: 'lines+markers',
    name: 'sinus',
    type: 'scatter',
    line: {
      color: 'rgb(219, 64, 82)', //sinus
      width: 3
    }
  };
  
  trace2 = {
    x: [],
    y: [],
    mode: 'lines+markers',
    name: 'cosinus',
    type: 'scatter',
    line: {
      color: 'rgb(55, 128, 191)',   //cosinus
      width: 3
    }
  };

if(typeof(EventSource) !== "undefined") {
    var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
    
    source.addEventListener("message", function(e) {
        var data = JSON.parse(e.data);
        var val = document.getElementById("component").shadowRoot.querySelector("#amplitude").value;
          trace1.x.push(data.x);
          trace1.y.push(data.y1 * val);
          trace2.x.push(data.x);
          trace2.y.push(data.y2 * val);
          
            
          var layout = {
            showlegend: false,
            autosize: true
          };
          
          var data = [trace1, trace2];
          
          Plotly.newPlot('graph', data, layout);
    }, false);
};

function changeVisibility(id) {
  switch(id) {
    case "sin": {
      if(!document.getElementById(id).checked){
        Plotly.restyle('graph', {visible: false}, [0]);
        return;
      }
      else {
        Plotly.restyle('graph', {visible: true}, [0]);
        return;
      }
    }
    case "cos": {
      if(!document.getElementById(id).checked){
        Plotly.restyle('graph', {visible: false}, [1]);
      return;
      }
      else {
        Plotly.restyle('graph', {visible: true}, [1]);
      return;
      }
    }
    default: return;
  }   
}

function stopGraph() {
  source.close();
}
