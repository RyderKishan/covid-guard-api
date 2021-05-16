const express = require('express');

// const logger = require('../utils/logger');
const { get } = require('../utils/request');
const exceptionHandler = require('../utils/exceptionHandler');

const router = express.Router();

router.get('/kishan', async (req, res) => {
  try {
    const vaccine = ['covaxin', 'covishield'];
    const minAgeLimit = 15;
    const maxAgeLimit = 30;
    const onlyAvailable = true;
    const feeType = ['free', 'paid'];
    const districtIds = [540, 549, 580, 780];
    const today = new Date().toLocaleDateString().replace(/\//g, '-');

    const allResponse = await Promise.all(
      districtIds.map(async (districtId) =>
        get(
          `${process.env.COVID_API}/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${today}`
        )
      )
    );
    console.log(
      'URL',
      `${process.env.COVID_API}/appointment/sessions/public/calendarByDistrict?district_id=${districtIds}&date=${today}`
    );
    const allCenters = [];
    // fee_type filter
    allResponse.forEach((a) =>
      allCenters.push(
        ...(a.centers || []).filter((c) =>
          feeType.includes(c.fee_type.toLowerCase())
        )
      )
    );
    // min_age_limit filter
    const finalCenters = allCenters
      .map((c) => {
        const filteredSessions = (c.sessions || []).filter(
          (s) =>
            s.min_age_limit > minAgeLimit &&
            s.min_age_limit < maxAgeLimit &&
            vaccine.includes((s.vaccine || '').toLowerCase()) &&
            (onlyAvailable ? s.available_capacity > 0 : true)
        );
        return { ...c, sessions: filteredSessions };
      })
      .filter((c) => c.sessions && c.sessions.length > 0);
    res.status(200).json(finalCenters);
  } catch (error) {
    exceptionHandler(error, res);
  }
});

module.exports = router;
