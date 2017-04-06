var express = require('express'),
	router = express.Router();

router.get('/', require('./get-user-skill_set.js'));
router.get('/core', require('./get-user-skill_set-core.js'));
router.get('/secondary', require('./get-user-skill_set-secondary.js'));
router.get('/tertiary', require('./get-user-skill_set-tertiary.js'));

module.exports = router;
