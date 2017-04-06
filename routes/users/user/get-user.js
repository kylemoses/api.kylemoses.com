var express = require('express');
var app = express({ mergeParams: true });
var router = express.Router();

router.get('/:name', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	reqName = req.params.name.toUpperCase();
	console.log('reqName', reqName)
	if (reqName === dataName) {
		res.json(apiData);
	} else {
		res.status(404).send('No match for: ' + reqName.toLowerCase());
	}
});

module.exports = router;
