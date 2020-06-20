function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (alldata =>{
            sampledata = alldata.samples.filter(d => d.id ==id)[0];
            console.log(sampledata)
            var ids = sampledata.otu_ids;
            console.log(alldata);
            var sampleValues =  sampledata.sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.otu_labels.slice(0,10);
            console.log (labels)
        // get only top 10 otu ids for the plot OTU and reversing it. 
            var OTU_top = ( sampledata.otu_ids.slice(0, 10)).reverse();
        // get the otu id's to the desired form for the plot
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
         // get the top 10 labels for the plot
            var labels =  sampledata.otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var data = [trace];
    
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // create the bar plot
        Plotly.newPlot("bar", data, layout);
            // The bubble chart
            var trace1 = {
                x: sampledata.otu_ids,
                y: sampledata.sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.sample_values,
                    color: sampledata.otu_ids
                },
                text:  sampledata.otu_labels
    
            };
    
            // set the layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // creating data variable 
            var data1 = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // create the function to get the necessary data
    function getDemoInfo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {
    // get the metadata info for the demographic panel
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
           demographicInfo.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        console.log(id);
        getPlots(id);
        getDemoInfo(id);
    }
    
    // create the function for the initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value", name);
            });
    
            // call the functions to display the data and the plots to the page
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);

        });

        //  Bonus 
        // modify the example gauge code to account for values ranging from 0 through 9.
        d3.selectAll("#selDataset").on("change", updatePlotly);

        // The guage chart
  
        var sampleData = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(wfreq),
            title: { text: `Weekly Washing Frequency ` },
            type: "indicator",
            
            mode: "gauge+number",
            gauge: { axis: { range: [null, 9] },
                     steps: [
                      { range: [0, 2], color: "yellow" },
                      { range: [2, 4], color: "cyan" },
                      { range: [4, 6], color: "teal" },
                      { range: [6, 8], color: "lime" },
                      { range: [8, 9], color: "green" },
                    ]}
                
            }
          ];
          var layoutSampleData = { 
              width: 700, 
              height: 600, 
              margin: { t: 20, b: 40, l:100, r:100 } 
            };
          Plotly.newPlot("gauge", sampleData, layoutSampleData);
        }
    
    init();



    