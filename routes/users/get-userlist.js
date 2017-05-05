var express = require('express'),
	router = express.Router(),
	fs = require('fs');

router.get('/', function(req, res) {
	var users = [];
	fs.readFile("./local_db.json", 'utf8', function(err, data) {
		if (err) {
			res.status(404).send({ status: 404, message: 'no users found!' });
		} else {
			data = (JSON.parse(data));
			for (var i = data.length - 1; i >= 0; i--) {
				users.push(data[i].details.name);
				console.log('users', users)
			}
			res.status(200).json(users);
		}
	});
});
module.exports = router;
