const express = require('express');
const https = require('https');

const logger = require('../utils/logger');
const { get } = require('../utils/request');
const exceptionHandler = require('../utils/exceptionHandler');

const router = express.Router();

router.get('/states', async (req, res) => {
  try {
    const url = `${process.env.COVID_API}/admin/location/states`;
    const data = [];

    https
      .get(url, (response) => {
        const headerDate =
          response.headers && response.headers.date
            ? response.headers.date
            : 'no response date';
        console.log('Status Code:', response.statusCode);
        console.log('Date in Response header:', headerDate);

        response.on('data', (chunk) => {
          data.push(chunk);
        });

        response.on('end', () => {
          console.log('Response ended: ');
          const states = JSON.parse(Buffer.concat(data).toString());
          console.log('states');
          res.status(200).json(states);
        });
      })
      .on('error', (err) => {
        console.log('Error: ', err.message);
        res.status(500).json(err);
      });

    // logger.info(`url - ${url}`);
    // const response = await get(url);
    // logger.info(`response - ${response}`);
    // res.status(200).json(data);
  } catch (error) {
    exceptionHandler(error, res);
  }
});

module.exports = router;
