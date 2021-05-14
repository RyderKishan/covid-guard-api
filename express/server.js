'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const API_ENDPOINT = 'https://icanhazdadjoke.com/';

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/call', (req, res) => {
  fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: String(error) });
    });
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
router.get('/ping', (req, res) => {
  res
    .status(200)
    .json({
      message: 'Application UP! ping',
      containerName: os.hostname(),
      timeStamp: new Date(),
    });
});
router.get('/health', (req, res) => {
  res
    .status(200)
    .json({
      message: 'Application UP!',
      containerName: os.hostname(),
      timeStamp: new Date(),
    });
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
