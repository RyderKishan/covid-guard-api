const express = require('express');
const LOG = require('../utils/logger');
const exceptionHandler = require('../utils/exceptionHandler');

const router = express.Router();

router.get('/states', async (req, res) => {
  LOG.info('URI : Local');
  try {
    const path = '/admin/location/states';
    fetch(`${process.env.COVID_API}${path}`)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log('err', err);
        res.status(500).json(err);
      });
  } catch (error) {
    exceptionHandler(error, res);
  }
});

module.exports = router;
