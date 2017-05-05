// server.js

// BASE SETUP
// =============================================================================

// require the packages we need
var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser').json();
//
var config = require('./config/main');
var User = require('./models/user');

// setup
var app = express({ mergeParams: true });

// use things
app.set('superSecret', config.secret);
app.use(bodyParser);

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();

// error handling
app.use(function(err, req, res, next) {
	if (err.status !== 404) {
		return next();
	}
	res.status(404);
	res.send(err.message || '** no unicorns here **');
});

app.use(function(err, req, res, next) {
	res.status(500);
	res.send('oops! something broke');
});

//public routes
router.get('/', function(req, res) {
	res.json({
		message: 'Welcome to my api!',
		instructions: "go to /api/authentiate?username=YOURUSERNAME&password=YOURPASSWORD to receive an authentication token"
	});
});
router.get('/authenticate', function(req, res) {
	var reqName = req.body.username || req.params.username || req.query.username;
	var reqPass = req.body.password || req.params.password || req.query.password;
	fs.readFile(__dirname + "/" + "local_db.json", 'utf8', function(err, data) {
		if (err) {
			res.status(404).send({ status: 404, message: 'no users found!' });
		} else {
			data = (JSON.parse(data));
			for (var i = data.length - 1; i >= 0; i--) {
				if (data[i].login.username.toLowerCase() === reqName.toLowerCase()) {
					user = {
						username: data[i].login.username,
						password: data[i].login.password
					}
				}
			}
			console.log(user)
			if (user) {
				// check if password matches
				if (user.password != reqPass) {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {
					// if user is found and password is right
					// create a token
					if (user.username === 'kyle') {
						//remove password from being encoded into the token
						user.password = "";
						var token = jwt.sign(user, app.get('superSecret'), {
							expiresIn: "1440years" // expires in 24 hours
						});
					} else {
						//remove password from being encoded into the token
						user.password = "";
						var token = jwt.sign(user, app.get('superSecret'), {
							expiresIn: "1440m" // expires in 24 hours
						});
					}

					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token
					});
				}
			} else {
				res.json({ success: false, message: 'Authentication failed. User not found.' });
			}
		}
	});
});

// token auth middleware
router.use(function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});

// Authenticated routes
router.use('/users', require('./routes/users'));

// all of our routes will be prefixed with /api
app.use('/api', router);

// Log requests to API using morgan
app.use(logger('dev'));

// Enable CORS from client-side
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

// START THE SERVER
if (typeof(PhusionPassenger) != 'undefined') {
	// webhost specific
	console.log('Example app listening with passenger');
	app.listen('passenger');
} else {
	// local dev
	app.listen(config.port);
	console.log('Magic happens on port ' + config.port);
}
