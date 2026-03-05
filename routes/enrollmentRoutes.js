const express = require('express');
const router = express.Router();
const db = require('../models');

// GET all enrollments
router.get('/', async (req, res) => {
  const enrollments = await db.Enrollment.findAll({
    include: [db.User, db.Class]
  });
  res.json(enrollments);
});

module.exports = router;