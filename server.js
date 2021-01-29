// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

// Start up an instance of app
var app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
//routes
app.get("/projectData", function (req, res) {
    res.json(projectData);
});
app.post("/projectData", function (req, res) {
    let data = req.body;
    projectData = data;
    res.send(JSON.stringify(projectData));
});


// Setup Server
app.listen(3000, () => console.log("connected"));