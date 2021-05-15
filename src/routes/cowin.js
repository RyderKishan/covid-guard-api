const express = require('express');
const { default: axios } = require('axios');

// const logger = require('../utils/logger');
// const { get } = require('../utils/request');
const exceptionHandler = require('../utils/exceptionHandler');

const router = express.Router();

const commonHeaders = {
  'content-type': 'application/json',
  'accept-language': 'en_US',
  // origin: 'https://selfregistration.cowin.gov.in',
  // referer: 'https://selfregistration.cowin.gov.in/',
  // authorization: `Bearer ${process.env.TOKEN || ''}`,
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
};

router.get('/states', async (req, res) => {
  try {
    const url = `${process.env.COVID_API}/admin/location/states`;

    const data = await axios.get(url, {
      headers: commonHeaders,
    });

    // res.status(500).json(err);
    // const response = await get(url);
    // logger.info(`response - ${response}`);
    res.status(200).json(data.data);
  } catch (error) {
    exceptionHandler(error, res);
  }
});

module.exports = router;
