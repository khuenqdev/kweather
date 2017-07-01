/**
 * Created by Nguyen Quang Khue on 30-Jun-17.
 */

// Import express framework
const express = require('express');
// Import hbs template engine
const hbs = require('hbs');
// Import weather utilities
const utils = require('./utils/utils');

// Initialize port
const port = process.env.PORT || 3000;

// Initialize express framework
var app = express();

// Register partial templates
hbs.registerPartials(__dirname + '/views/partials');
// Set hbs as rendering engine
app.set('view engine', 'hbs');
// Add assets location
app.use(express.static(__dirname + '/assets'));

// Register a template helper
hbs.registerHelper('toUpperCase', (text) => {
    return text.toUpperCase();
});

// Weather home page
app.get('/', (req, res) => {
    var units = req.query['units'];
    utils.getWeatherInformation(units, (information) => {
        res.render('index.hbs', {
            pageTitle: 'KWeather',
            description: 'An application for getting current weather information',
            author: 'Khue Quang Nguyen',
            information: information
        });
    });
});

// Start server on the system defined port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

