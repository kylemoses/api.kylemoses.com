var express = require('express'),
	router = express.Router();

router.get('/core', function(req, res) {
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	if (reqName.toUpperCase() === dataName) {
		if (Object.keys(apiData.skill_set).length >= 1) {
			if (apiData.skill_set.core.length >= 1) {
				res.json(apiData.skill_set.core);
			} else {
				res.status(404).send({ 'error': 404, 'message': reqName + 'has no \"core\" skills!' });
			}
		} else {
			res.status(404).send({ 'error': 404, 'message': reqName + ' has no skills!' });
		}
	} else {
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + reqName });
	}
});
module.exports = router;
