const express = require('express');
const router = express.Router();
const db = require('../models');

// GET all classes
router.get('/', async (req, res) => {
  const classes = await db.Class.findAll();
  res.json(classes);
});

module.exports = router;