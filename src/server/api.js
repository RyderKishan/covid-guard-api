'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('../routes');

const app = express();
const router = express.Router();

routes.initialize(router);

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../public')));

app.use('/.netlify/functions/api', router);
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
