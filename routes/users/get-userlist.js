var express = require('express'),
	router = express.Router(),
	fs = require('fs');

router.get('/', function(req, res) {
	var users = "";
	fs.readFile("./users.json", 'utf8', function(err, data) {
		if (err) {
			res.status(404).send({ status: 404, message: 'no users found!' });
		} else {
			users = (JSON.parse(data));
			res.status(200).json(users);
		}
	});
});
module.exports = router;
