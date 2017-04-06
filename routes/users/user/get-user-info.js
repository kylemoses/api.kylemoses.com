var express = require('express');
var app = express({ mergeParams: true });
var router = express.Router();

router.get('/info', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	if (reqName.toUpperCase() === dataName) {
		if (Object.keys(apiData.info).length >= 1) {
			res.json({
				"name": apiData.name,
				"role": apiData.role,
				"info": apiData.info,
				"links": apiData.links,
			});
		} else {
			res.status(404).send("No info found for: " + reqName);
		}
	} else {
		res.status(404).send('No match for: ' + reqName);
	}
});

// export get user info routes
module.exports = router;
