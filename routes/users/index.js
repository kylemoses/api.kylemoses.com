var express = require('express');
var app = express({ mergeParams: true });
var router = express.Router();
var fs = require('fs');

apiData = "";
reqName = "";
// middlewares
router.use(function(req, res, next) {
	if (req.method === "GET") {
		if (apiData.typeof != "Object") {
			fs.readFile("./local_db.json", 'utf8', function(err, data) {
				if (data != undefined) {
					apiData = JSON.parse(data);
					apiData = data.info;
					next();
				} else {
					res.status(404).send({ 'error': 404, 'message': 'no data returned' });
				}
			});
		} else {
			res.status(404).send({ 'error': 404, 'message': 'no data returned' });
		}
	} else {
		next();
	}
});
router.use('/:name', function(req, res, next) {
	if (req.method === "GET") {
		reqName = req.params.name;
		next();
	} else {
		next();
	}
});
// routes
router.get('/', require('./get-userlist.js'));
router.get('/:name', require('./user/get-user.js'));
router.use('/:name/', require('./user'));


// export users routes
module.exports = router;
