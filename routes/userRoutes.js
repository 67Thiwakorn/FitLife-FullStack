const express = require('express');
const router = express.Router();
const db = require('../models');

// GET all users
router.get('/', async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
});

module.exports = router;