const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
require('dotenv').config();

const Logger = require('./utils/logger');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 9000;

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, Host'
  );
  next();
});

app.use(express.static(path.join(__dirname, '../public')));
app.use(compression());
// app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan(
    (tokens, req, res) =>
      JSON.stringify({
        method: tokens.method(req, res),
        status: tokens.status(req, res),
        tokens: tokens.url(req, res),
        body: JSON.stringify(req.body),
        time: `${tokens['response-time'](req, res)} ms`,
      }),
    { stream: Logger.stream }
  )
);

routes.bind(app);

app.listen(PORT, () =>
  console.log(`Covid Guard Api listening on port ${PORT}!`)
);
