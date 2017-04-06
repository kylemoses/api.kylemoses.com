var express = require('express'),
	router = express.Router();

router.get('/elevator_speach', function(req, res) {
	console.log("apiData: " + apiData);
	var dataName = apiData.name.substr(0, apiData.name.indexOf(" ")).toUpperCase();
	if (reqName.toUpperCase() === dataName) {
		if (Object.keys(apiData.elevator_speach).length >= 1) {
			res.status(200).json(apiData.elevator_speach);
		}
	} else {
		res.status(404).send({ 'error': 404, 'message': 'No match for: ' + req.params.name });
	}
});

module.exports = router;
