const { Router } = require('express');
const countries = require('./countries');
const activity = require('./activity');
const router = Router();

router.use('/countries', countries);
router.use('/activity', activity);

module.exports = router;