var express = require('express');
var app = express({ mergeParams: true });
var router = express.Router();
var fs = require('fs');

router.get('/info', require('./get-user-info.js'));
router.get('/employed', require('./get-user-employed.js'));
router.get('/elevator_speach', require('./get-user-elevator_speach.js'));
router.get('/skill_set', require('./skill_set/get-user-skill_set.js'));
router.use('/skill_set/', require('./skill_set'));

module.exports = router;
