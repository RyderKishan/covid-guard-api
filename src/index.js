const express = require('express');
const os = require('os');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 5500;

app.use(express.static('public'));
app.use(morgan('tiny'));

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Application UP!',
    containerName: os.hostname(),
    timeStamp: new Date()
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
