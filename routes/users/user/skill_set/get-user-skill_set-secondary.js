var express = require('express'),
	router = express.Router();

router.get('/secondary', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	if (reqName.toUpperCase() === dataName) {
		if (Object.keys(apiData.skill_set).length >= 1) {
			if (apiData.skill_set.secondary.length >= 1) {
				res.json(apiData.skill_set.secondary);
			} else {
				res.status(404).send({ 'error': 404, 'message': reqName + 'has no \"secondary\" skills!' });
			}
		} else {
			res.status(404).send({ 'error': 404, 'message': reqName + ' has no skills!' });
		}
	} else {
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + reqName });
	}
});

module.exports = router;
