//  Creating Variables and Functions

// - movieDataUrl simply has a string with the url of the json file with our data
// - movieData will store the data we import as a javascript object
// - canvas is a d3 selection of the svg canvas by its id
// - drawTreeMap is a function to create the treemap once we have imported our data

let movieDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'

let movieData

let canvas = d3.select('#canvas')

let drawTreeMap = () => {

}


// Fetching the Data
// - Call the d3 json() method, giving the url of the json data
// - Specify a function to run in .then() when the promise is resolved, that takes in the data
//  (d3 has converted from json to javascript object) and any errors
// - If there is an error, log it, otherwise set the movieData variable to the data
// - Finally, run the drawTreeMap() method to use the data to draw the treemap

d3.json(movieDataUrl).then(
    (data, error) => {
        if(error){
            console.log(error)
        } else {
            movieData = data
            console.log(movieData)
            drawTreeMap()
        }
    }
)