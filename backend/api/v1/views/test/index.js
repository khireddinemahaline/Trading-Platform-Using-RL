// test api

const express = require('express');
const router = express.Router();
const { prisma } = require('../../app');

// test message
router.get('/test', async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Hello from the API' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;