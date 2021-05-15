const express = require('express');

const logger = require('../utils/logger');
const { get } = require('../utils/request');
const exceptionHandler = require('../utils/exceptionHandler');

const router = express.Router();

router.get('/states', async (req, res) => {
  try {
    const url = `${process.env.COVID_API}/admin/location/states`;
    logger.info(`url - ${url}`);
    const response = await get(url);
    logger.info(`response - ${response}`);
    res.status(200).json(response);
  } catch (error) {
    exceptionHandler(error, res);
  }
});

router.get('/webhook', async (req, res) => {
  try {
    const url = 'https://webhook.site/0be32df4-12ec-4175-a4e3-5ff9173ccc0a';
    logger.info(`url - ${url}`);
    await get(url);
    // logger.info(`response - ${response}`);
    res
      .status(200)
      .json({
        // response,
        url: 'https://webhook.site/0be32df4-12ec-4175-a4e3-5ff9173ccc0a',
      });
  } catch (error) {
    exceptionHandler(error, res);
  }
});

module.exports = router;
