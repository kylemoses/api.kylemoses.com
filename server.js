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
var apiData = ""
fs.readFile(__dirname + "/" + "kyle.json", 'utf8', function(err, data) {
	apiData = JSON.parse(data);
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({
		message: 'hooray! welcome to my api!',
		instructions: 'go to the main endpoint "/api/kyle/" to see my JSON style resume!'
	});
});

// more routes for our API will happen here
router.get('/:name', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	var reqName = req.params.name.toUpperCase();
	if (reqName === dataName) {
		res.json(apiData);
	} else {
		res.status(404).send('No match for: ' + reqName);
	}
});
router.get('/:name/info', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	var reqName = req.params.name.toUpperCase();
	if (reqName === dataName) {
		if (Object.keys(apiData.info).length >= 1) {
			res.json({
				"name": apiData.name,
				"role": apiData.role,
				"info": apiData.info,
				"links": apiData.links,
			});
		} else {
			res.status(404).send("No info found for: " + name);
		}
	} else {
		res.status(404).send('No match for: ' + name);
	}
});
router.get('/:name/employed', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	var reqName = req.params.name.toUpperCase();
	if (reqName === dataName) {
		res.json(apiData.employed);
	} else {
		res.status(404).send('No match for: ' + name);
	}
});
router.get('/:name/skill_set', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	var reqName = req.params.name.toUpperCase();
	if (reqName === dataName) {
		console.log('apiData.skillset: ' + apiData.skill_set);
		if (Object.keys(apiData.skill_set).length >= 1) {
			res.json(apiData.skill_set);
		} else {
			res.status(404).send(name + "has no skills!");
		}
	} else {
		res.status(404).send('No match for: ' + name);
	}
});
router.get('/:name/skill_set/core', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	var reqName = req.params.name.toUpperCase();
	if (reqName === dataName) {
		if (Object.keys(apiData.skill_set).length >= 1) {
			if (apiData.skill_set.core.length >= 1) {
				res.json(apiData.skill_set.core);
			} else {
				res.status(404).send(name + "has no \"core\" skills!");
			}
		} else {
			res.status(404).send(name + "has no skills!");
		}
	} else {
		res.status(404).send('No match for: ' + name);
	}
});
router.get('/:name/elevator_speach', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	var reqName = req.params.name.toUpperCase();
	if (reqName === dataName) {
		if (Object.keys(data.elevator_speach).length >= 1) {
			res.json(data.elevator_speach);
		}
	} else {
		res.status(404).send('No match for: ' + name);
	}
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
//Required to get the app running when accessing with a domain
if (typeof(PhusionPassenger) != 'undefined') {
	console.log('Example app listening with passenger');
	app.listen('passenger');
} else {
	app.listen(port);
	console.log('Magic happens on port ' + port);
}
