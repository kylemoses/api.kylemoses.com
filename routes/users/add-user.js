var express = require('express'),
	router = express.Router();
var User = require('./models/user.js');

router.post('/', function(req, res) {
	// create a sample user
	var name = req.query.username;
	var pass = req.query.password
	var newUser = new User(name, pass);
	var users = [];
	var userExists = false;
	// save the sample user
	fs.readFile(__dirname + "/" + "local_db.json", 'utf8', function(err, data) {
		users = (JSON.parse(data));
		for (var i = users.length - 1; i >= 0; i--) {
			if (users[i].username === name) {
				userExists = true;
			}
		}
		if (!userExists) {
			var newuser = newUser.getInfo();
			users.push(newUser.getInfo());
			fs.writeFile(__dirname + "/" + "local_db.json", JSON.stringify(users), 'utf8', function(err, data) {
				res.status(201).send({ status: 201, message: 'user added' });
			});
		} else {
			res.status(200).send({ status: 200, message: 'user already Exists' });
		}
	});
});
module.exports = router;
