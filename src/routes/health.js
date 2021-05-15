const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');

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

router.get('/read', (req, res) => {
  const fileList = [];
  fs.readdirSync(path.join(__dirname, '../../')).forEach((file) => {
    fileList.push(file);
  });
  res.status(200).json({
    fileList,
  });
});

module.exports = router;
