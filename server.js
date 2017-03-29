// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var fs = require('fs'); // require fs

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to my api!' });
});

// more routes for our API will happen here
router.get('/developers', function(req, res) {
	var developers = [];
	var data = "";
	fs.readFile(__dirname + "/" + "developers.json", 'utf8', function(err, data) {
		data = JSON.parse(data);
		for (var i = 0; i < data.developers.length; i++) {
			developers.push(data.developers[i].info);
		}
		res.json(developers);
	});
});

router.get('/developers/:name', function(req, res) {
	var developers = [];
	var data = "";
	fs.readFile(__dirname + "/" + "developers.json", 'utf8', function(err, data) {
		data = JSON.parse(data);
		for (var i = 0; i < data.developers.length; i++) {
			if (data.developers[i].info.name == req.params.name) {
				developers.push(data.developers[i]);
			}
		}
		if (developers.length != 0) {
			res.json(developers);
		} else {
			res.status(404).send('No devs matched!');
		}
	});
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
