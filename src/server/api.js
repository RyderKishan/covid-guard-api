const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('../routes');

const app = express();
const router = express.Router();

routes.initialize(router);
router.use(compression())
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../public')));

app.use('/.netlify/functions/api', router);
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../../public/index.html')));

module.exports = app;
module.exports.handler = serverless(app);
