var express = require('express'),
	router = express.Router();

router.get('/', function(req, res) {
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

module.exports = router;
