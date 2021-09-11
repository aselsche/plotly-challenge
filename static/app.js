//Use D3 fetch to read the json file
// create the function that gets the data and creates the plots for the id 
d3.json("../data/samples.json").then(data => {
    // Select the dropdown menu to test
    let selector = d3.select('#selDataset');

    console.log(data);
    // referencing names
    let names = data.names;
    selector.selectAll('option')
        .data(names)
        .enter()
        .append('option')
        .attr("value", function (d) { return d; })
        .text(function (d) { return d; });

    let wfreq = data.metadata.map(d => d.wfreq)
    console.log(`Washing Freq: ${wfreq}`)


    selector.on("change", (e) => {
        let selectedName = selector.node().value,
            nameIx = names.findIndex(name => name == selectedName);

        // Demographic informaton table
        demogrTable = data.metadata[nameIx];
        console.log(demogrTable);

        
        demoHtmlContent = Object.entries(demogrTable).reduce((accum, [k,v]) => {
            return accum + `
                <tr><th>${k}</th><td>${v}</td></tr>
            `

        }, '');

        let metadataEl = d3.select('#sample-metadata')
            .html(`
                <table>
                    ${demoHtmlContent}
                </table>
            `)


        updateData(data.samples[nameIx]);
    });
});


//Display the sample metadata, i.e., an individual's demographic information.
// Call updatePlotly() when a change takes place to the DOM
// function that wraps around the d3 pattern (bind, add, update, remove)
function updateData(newData) {
    d3.json("../data/samples.json").then((data) => {
        // Use sample_values as the values for the bar chart.
        let samples = data.samples;
        let arrayResult = samples.filter(sampleObj => sampleObj.id == newData);
        let result = arrayResult[0];
        console.log(result);
        let idOtu = result.otu_ids;
        let labels = result.otu_labels;
        let sample_values = result.sample_values;

        console.log(`OTU IDS: ${idOtu}`)


        console.log(newData.sample_values.slice(0, 10).reverse());
        console.log(sampleValues);
        

        //get only the top 10 OTUs for the plot and reverse it for the display
        // let OTU_top10 = newData.otu_ids.slice(0, 10).reverse();

        // get the OTU id's to the desired form for the plot, and // Use otu_ids as the labels for the bar chart.
        // let idOtu = OTU_top10.map(d => "OTU " + d)
        

        // get the top 10 labels for the plot & // Use otu_labels as the hovertext for the chart.
        
        console.log(labels);
        console.log(`Sample Values: ${sampleValues}`)
        console.log(`Id Values: ${OTU_top10}`)

        // BAR CHART  - Use sample_values as the values for the bar chart.

        // Create trace variable for the plot
        let trace = {
            x: sample_values.slice(0,10).reverse(),
            y: idOtu.slice(0,10).map(otuId => `OTU ${otuId}`).reverse(),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };

        // Data trace array
        let barData = [trace];

        // Apply the group barmode to the layout
        let barlayout = {
            title: "Top 10 OTUs found in selected Test Subject ID No",
            xaxis: { title: "Sample Values" },
            autosize: false,
            width: 450,
            height: 600
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", barData, barlayout);

        //BUBBLE CHART - that displays each sample: Use otu_ids for the x values, use sample_values for the y values.
        // Use otu_ids for the marker colors, use otu_labels for the text values.

        let trace2 = {
            x: idOtu,
            y: sample_values,
            text: labels,
            mode: 'markers',
            marker: {
                color: idOtu,
                size: sample_values,
                // sizemode:'area',
                // sizemin: 4,
                colorscale: "Earth"
        }
        },
            bubbleData = [trace2],

            bubblelayout = {
                title: `<b>Sample values of OTU IDs of the selected individual<b>`,
                xaxis: { title: "OTU ID" },
                showlegend: false
            }

        Plotly.newPlot("bubble", bubbleData, bubblelayout);

});
}

