const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const PKI_FILE = path.join(
  __dirname,
  '../../public/B97645502D106ED1E667E38D31617749.txt'
);

router.get('/', async (req, res) => {
  res.status(200).json('4444');
});

router.get(
  '/.well-known/pki-validation/B97645502D106ED1E667E38D31617749.txt',
  async (req, res) => {
    res.status(200).sendFile(PKI_FILE);
  }
);

router.get('/ping', async (req, res) => {
  try {
    console.log('req', req.headers);
    // console.log('req', req);
    res.status(200).json('req');
  } catch (e) {
    res.status(500).json(e);
  }
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
