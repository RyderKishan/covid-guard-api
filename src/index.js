const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
require('dotenv').config();

const { get } = require('./utils/request');

const app = express();

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/cowin/states', async (req, res) => {
  try {
    const response = await get(
      'https://cdn-api.co-vin.in/api/v2/admin/location/states'
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: JSON.stringify(e),
    });
  }
});

app.listen(process.env.PORT || 9000, () =>
  console.log(`Local app listening on port ${process.env.PORT || 9000}!`)
);
