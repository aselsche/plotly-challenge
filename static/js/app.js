//create the function to get the data and create the plots by ID
function getData(id) {

    //get the data from the json file
    d3.json("../data/samples.json").then(data => {
        console.log(data);
    });
}

getData();

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// Use sample_values as the values for the bar chart.

// Use otu_ids as the labels for the bar chart.

// Use otu_labels as the hovertext for the chart.
