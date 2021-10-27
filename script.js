//  Creating Variables and Functions

// - movieDataUrl simply has a string with the url of the json file with our data
// - movieData will store the data we import as a javascript object
// - canvas is a d3 selection of the svg canvas by its id
// - drawTreeMap is a function to create the treemap once we have imported our data

let movieDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'

let movieData

let canvas = d3.select('#canvas')

let drawTreeMap = () => {

    
// #3: My tree map should have rect elements with a corresponding class="tile" that represent the data
// Creating a Hierarchy:
// - We first have to create a 'hierarchy' with our data to tell d3 how to order things and how to determine the areas of items
// - We do this by calling the d3.hierarchy() method. We give this two arguments. 
// Firstly, the data object movieData which we imported earlier, 
// secondly a function to point it to where the child nodes are → 
// here they are in an array called 'children' so we return that
// - We then call the sum() method on this hierarchy, where we give it a function that takes in one of the items/nodes of the tree, 
// in this case, a movie and tell it from where we should determine the area. We want this to be based on the value, since a larger value should create a larger block. 
// So point this to return the 'value' field.
// - We then call the sort() method on this hierarchy to specify how we should order the data.
//  This is given a function that takes in any two nodes. We subtract and return the value of node 1 from node 2.
//  If this is positive, node 2 has a higher value and should be ahead, otherwise node 1 should be ahead

let hierarchy = d3.hierarchy(movieData, 
    (node) => {
        return node['children']
    }
).sum(
    (node) => {
        return node['value']
    }
).sort(
    (node1, node2) => {
        return node2['value'] - node1['value']
    } 
)

let createTreeMap = d3.treemap()
                        .size([1000, 600])

createTreeMap(hierarchy)                  

let movieTiles = hierarchy.leaves()
console.log(movieTiles)

// Creating the Tiles:
// - We are using'g' here instead of direct rectangles since we want to add text to the tles
// - Select all the g on the canvas and assign this to the variable blocks
// - Associate them with the movieTiles array
// - Call enter() to determine what to do for each movie where there isn't a g element
// - Create a new g element with the append() method and type of 'g'
// - Append each block with a 'rect' element to create a rectangle in each block
// - Set the class of the rectangle to 'tile'

let block = canvas.selectAll('g')
            .data(movieTiles)
            .enter()
            .append('g')
//  #6: The area of each tile should correspond to the data-value amount: 
// tiles with a larger data-value should have a bigger area
// Set the coordinates of the blocks:
// - Apply a translate transformation to the 'g' blocks
// - Give it a function to take in an item from the movieTiles array (a movie)
// - Translate it along the x axis by x0 and y axis by y0, so that the top left corner of the block is at x0, y0
            .attr('transform', (movie) => {
                return 'translate(' + movie['x0'] + ',' + movie['y0'] + ')'
            })

block.append('rect')
        .attr('class', 'tile')
        // #4: There should be at least 2 different fill colors used for the tiles
        // Add a 'fill' attribute to the rectangle selection like this:      
        // - Select the 'category' field from the 'data' object from the movie item
        // - Return different color values based on the category
        .attr('fill', (movie) => {
            let category = movie['data']['category']
            if(category === 'Action'){
                return 'orange'
            }else if(category === 'Drama'){
                return 'lightgreen'
            }else if(category === 'Adventure'){
                return 'crimson'
            }else if(category === 'Family'){
                return 'steelblue'
            }else if(category === 'Animation'){
                return 'pink'
            }else if(category === 'Comedy'){
                return 'khaki'
            }else if(category === 'Biography'){
                return 'tan'
            }
    // tile with name, category and value
        }).attr('data-name', (movie) => {
            return movie['data']['name']
        }).attr('data-category', (movie) => {
            return movie['data']['category']
        }).attr('data-value', (movie) =>{
            return movie['data']['value']
        })
        // adding rectangle in the graph
        .attr('width', (movie) =>{
            return movie['x1'] - movie['x0']
        })
        .attr('height', (movie) => {
            return movie['y1'] - movie['y0']
        })
        // the text represent each movie
        
    block.append('text')
            .text((movie) => {
                return movie['data']['name']
            })
            .attr('x', 5)
            .attr('y', 20)


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
