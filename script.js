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