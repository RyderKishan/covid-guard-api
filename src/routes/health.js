const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).json();
});

router.get(
  '/.well-known/pki-validation/B97645502D106ED1E667E38D31617749.txt',
  async (req, res) => {
    res.status(200)
      .json(`AC46FEEB44344D3FAB1D7A954E2686D2591574A2CABFFBE7DF8F06BCD3E7668B
    comodoca.com
    6364fea944ad144`);
  }
);

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
