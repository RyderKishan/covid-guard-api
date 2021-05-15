const express = require('express');
const os = require('os');

const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).json();
});

router.get('/ping', async (req, res) => {
  res.status(200).json();
});

router.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Application UP!',
    env: process.env,
    containerName: os.hostname(),
    timeStamp: new Date().toISOString(),
  });
});

module.exports = router;
