// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
//must keep this function and name
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    // ASK THE TA WHY AND HOW TO WALK THE DOG ON "THIS" = any 
    let Element = d3.select(this);

    // 4b. Save the value that was changed as a variable.
    //the "element" is from above
    let Value = Element.property("value");

    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = Element.attr("id");
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    //I need an if else statement using the varibles element, value, id. 

    if (Value) {
      filters[filterId] = Value;
    } else {
   //clears the filters   
      delete filters[filterId];
    }
 
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  //must keep this function and name
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    // this is from homework / reading
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    // loop example using arrow from homework 
    //filteredData = filteredData.filter(row => row.datetime === date);
    Object.entries(filters).forEach(([key, value]) => {
      //using key, value pair
      filteredData = filteredData.filter(row => row[key] === value);
    });
    
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  //d3.selectAll("#filter-btn").on("click", handleClick);
  //not using the handleClick()???? 
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);

