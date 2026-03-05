const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportController');

router.get('/members-in-class', controller.membersInClass);
router.get('/member-schedule', controller.memberSchedule);

module.exports = router;