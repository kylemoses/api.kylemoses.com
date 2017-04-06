var express = require('express');
var app = express({ mergeParams: true });
var router = express.Router();

router.get('/employed', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	if (reqName.toUpperCase() === dataName) {
		res.json(apiData.employed);
	} else {
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + req.params.name });
	}
});

module.exports = router;
