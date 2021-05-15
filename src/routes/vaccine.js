const express = require('express');

const logger = require('../utils/logger');
const { get } = require('../utils/request');
const exceptionHandler = require('../utils/exceptionHandler');

const router = express.Router();

router.get('/availability', async (req, res) => {
  try {
    const {
      vaccine = 'covaxin',
      min_age_limit = 45,
      only_available = 'false',
      fee_type = 'free',
      state_id = 1,
      district_ids = '[]',
    } = req.query;
    logger.info(`req.query - ${JSON.stringify(req.query)}`);

    const today = new Date().toLocaleDateString().replace(/\//g, '-');
    logger.info(`today - ${today}`);
    const stateId = Number(state_id);
    logger.info(`stateId - ${stateId}`);
    const minAgeLimit = Number(min_age_limit);
    logger.info(`minAgeLimit - ${minAgeLimit}`);
    const onlyAvailable = only_available === 'true';
    logger.info(`onlyAvailable - ${onlyAvailable}`);
    const districtIds = JSON.parse(district_ids);
    logger.info(`districtIds - ${districtIds}`);
    const allResponse = await Promise.all(
      districtIds.map(async (districtId) =>
        get(
          `${process.env.COVID_API}/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${today}`
        )
      )
    );
    logger.info('allResponse');
    const allCenters = [];
    logger.info('allCenters');
    // fee_type filter
    allResponse.forEach((a) =>
      allCenters.push(
        ...(a.centers || []).filter(
          (c) => (c.fee_type || '').toLowerCase() === fee_type
        )
      )
    );
    logger.info('allResponse 2');
    // min_age_limit filter
    const finalCenters = allCenters
      .map((c) => {
        const filteredSessions = (c.sessions || []).filter(
          (s) =>
            s.min_age_limit === minAgeLimit &&
            (s.vaccine || '').toLowerCase() === vaccine &&
            (onlyAvailable ? s.available_capacity > 0 : true)
        );
        return { ...c, stateId, sessions: filteredSessions };
      })
      .filter((c) => c.sessions && c.sessions.length > 0);
    logger.info('finalCenters');
    res.status(200).json(finalCenters);
  } catch (error) {
    exceptionHandler(error, res);
  }
});

module.exports = router;
