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

module.exports = router;
