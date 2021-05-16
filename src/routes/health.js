const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');
const pjson = require('../../package.json');

console.log(pjson.version);
const router = express.Router();

const PKI_FILE = path.join(
  __dirname,
  '../../public/A5D1FA7A50EFD921890B3ACEAFDE7AB4.txt'
);

router.get('/', async (req, res) => {
  res.status(200).json(`Covid Guard Api - ${pjson.version}`);
});

router.get('/ping', async (req, res) => {
  try {
    res.status(200).json();
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get(
  '/.well-known/pki-validation/A5D1FA7A50EFD921890B3ACEAFDE7AB4.txt',
  async (req, res) => {
    res.status(200).sendFile(PKI_FILE);
  }
);

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
