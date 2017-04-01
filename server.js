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
router.get('/:name', function(req, res) {
	var data = "";
	var name = "";
	fs.readFile(__dirname + "/" + "kyle.json", 'utf8', function(err, data) {
		data = JSON.parse(data);
		name = data.name.substr(0, data.name.indexOf(" "));
		if (name == req.params.name) {
			res.json(data);
		} else {
			res.status(404).send('No match for: ' + name);
		}
	});
});
router.get('/:name/info', function(req, res) {
	var data = "";
	var name = "";
	fs.readFile(__dirname + "/" + "kyle.json", 'utf8', function(err, data) {
		data = JSON.parse(data);
		name = data.name.substr(0, data.name.indexOf(" "));
		if (name == req.params.name) {
			if (Object.keys(data.info).length >= 1) {
				res.json(data.info);
			} else {
				res.status(404).send("No info found for: " + name);
			}
		} else {
			res.status(404).send('No match for: ' + name);
		}
	});
});
router.get('/:name/employed', function(req, res) {
	var data = "";
	var name = "";
	fs.readFile(__dirname + "/" + "kyle.json", 'utf8', function(err, data) {
		data = JSON.parse(data);
		name = data.name.substr(0, data.name.indexOf(" "));
		if (name == req.params.name) {
			res.json(data.employed);
		} else {
			res.status(404).send('No match for: ' + name);
		}
	});
});
router.get('/:name/skillset', function(req, res) {
	var data = "";
	var name = "";
	fs.readFile(__dirname + "/" + "kyle.json", 'utf8', function(err, data) {
		data = JSON.parse(data);
		name = data.name.substr(0, data.name.indexOf(" "));
		if (name == req.params.name) {
			if (Object.keys(data.skillset).length >= 1) {
				res.json(data.skillset);
			} else {
				res.status(404).send(name + "has no skills!");
			}
		} else {
			res.status(404).send('No match for: ' + name);
		}
	});
});
router.get('/:name/skillset/core', function(req, res) {
	var data = "";
	var name = "";
	fs.readFile(__dirname + "/" + "kyle.json", 'utf8', function(err, data) {
		data = JSON.parse(data);
		name = data.name.substr(0, data.name.indexOf(" "));
		if (name == req.params.name) {
			if (Object.keys(data.skillset).length >= 1) {
				if (data.skillset.core.length >= 1) {
					res.json(data.skillset.core);
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
});
router.get('/:name/elevator_speach', function(req, res) {
	var data = "";
	var name = "";
	fs.readFile(__dirname + "/" + "kyle.json", 'utf8', function(err, data) {
		data = JSON.parse(data);
		name = data.name.substr(0, data.name.indexOf(" "));
		if (name == req.params.name) {
			if (Object.keys(data.elevator_speach).length >= 1) {
				res.json(data.elevator_speach);
			}
		} else {
			res.status(404).send('No match for: ' + name);
		}
	});
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
