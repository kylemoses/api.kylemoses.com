// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var fs = require('fs'); // require fs
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var config = require('./config/main');
var User = require('./models/user');
// setup
var apiData = "";
app.set('superSecret', config.secret);
app.use(bodyParser.json());
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({
		message: 'hooray! welcome to my api!',
		instructions: 'go to the main endpoint "/api/kyle/" to see my JSON style resume!'
	});
});

router.get('/setup', function(req, res) {
	// create a sample user
	var name = req.query.username;
	var pass = req.query.password
	var newUser = new User(name, pass);
	var users = [];
	var userExists = false;
	// save the sample user
	fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
		users = (JSON.parse(data));
		for (var i = users.length - 1; i >= 0; i--) {
			if (users[i].username === name) {
				userExists = true;
			}
		}
		if (!userExists) {
			var newuser = newUser.getInfo();
			users.push(newUser.getInfo());
			fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(users), 'utf8', function(err, data) {
				res.status(201).send({ status: 201, message: 'user added' });
			});
		} else {
			res.status(200).send({ status: 200, message: 'user already Exists' });
		}
	});
});
router.get('/users', function(req, res) {
	var users = "";
	fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
		if (err) {
			res.status(404).send({ status: 404, message: 'no users found!' });
		} else {
			users = (JSON.parse(data));
			res.status(200).json(users);
		}
	});
})
router.post('/authenticate', function(req, res) {});

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
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + req.params.name });
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
			res.status(404).send({ 'error': 404, 'message': req.params.name + ' has no skills!' });
		}
	} else {
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + req.params.name });
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
				res.status(404).send({ 'error': 404, 'message': req.params.name + 'has no \"core\" skills!' });
			}
		} else {
			res.status(404).send({ 'error': 404, 'message': req.params.name + ' has no skills!' });
		}
	} else {
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + req.params.name });
	}
});
router.get('/:name/skill_set/secondary', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	var reqName = req.params.name.toUpperCase();
	if (reqName === dataName) {
		if (Object.keys(apiData.skill_set).length >= 1) {
			if (apiData.skill_set.secondary.length >= 1) {
				res.json(apiData.skill_set.secondary);
			} else {
				res.status(404).send({ 'error': 404, 'message': req.params.name + 'has no \"secondary\" skills!' });
			}
		} else {
			res.status(404).send({ 'error': 404, 'message': req.params.name + ' has no skills!' });
		}
	} else {
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + req.params.name });
	}
});
router.get('/:name/skill_set/tertiary', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	var reqName = req.params.name.toUpperCase();
	if (reqName === dataName) {
		if (Object.keys(apiData.skill_set).length >= 1) {
			if (apiData.skill_set.tertiary.length >= 1) {
				res.json(apiData.skill_set.tertiary);
			} else {
				res.status(404).send({ 'error': 404, 'message': req.params.name + 'has no \"tertiary\" skills!' });
			}
		} else {
			res.status(404).send({ 'error': 404, 'message': req.params.name + ' has no skills!' });
		}
	} else {
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + req.params.name });
	}
});
router.get('/:name/elevator_speach', function(req, res) {
	console.log("apiData: " + apiData);
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	var reqName = req.params.name.toUpperCase();
	if (reqName === dataName) {
		if (Object.keys(apiData.elevator_speach).length >= 1) {
			res.status(200).json(apiData.elevator_speach);
		}
	} else {
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + req.params.name });
	}
});


// middlewares
app.use(function(req, res, next) {
	if (req.method === "GET") {
		if (apiData.typeof != "Object") {
			fs.readFile(__dirname + "/" + "kyle.json", 'utf8', function(err, data) {
				apiData = JSON.parse(data);
				next();
			});
		} else {
			res.status(404).send({ 'error': 404, 'message': 'no data returned' });
		}
	} else {
		next();
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
	app.listen(config.port);
	console.log('Magic happens on port ' + config.port);
}

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});
