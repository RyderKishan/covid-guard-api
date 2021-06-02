const express = require('express');
const moment = require('moment');

const logger = require('../utils/logger');
const { get } = require('../utils/request');
const exceptionHandler = require('../utils/exceptionHandler');

const router = express.Router();

const dates = [
  moment(new Date()).format('DD-MM-YYYY'),
  moment(new Date()).add(7, 'days').format('DD-MM-YYYY'),
  moment(new Date()).add(14, 'days').format('DD-MM-YYYY')
];

router.get('/availability/kishan', async (req, res) => {
  try {
    const vaccine = ['covaxin', 'covishield'];
    const minAgeLimit = 15;
    const maxAgeLimit = 30;
    const onlyAvailable = true;
    const feeType = ['free', 'paid'];
    const districtIds = [549, 580, 780];

    const paths = [];

    districtIds.forEach((districtId) => {
      dates.forEach((dt) => {
        paths.push(
          `${process.env.COVID_API}/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${dt}`
        );
      });
    });

    const allResponse = await Promise.all(paths.map((path) => get(path)));
    const allCenters = [];
    // fee_type filter
    allResponse.forEach((a) =>
      allCenters.push(
        ...(a.centers || []).filter((c) =>
          feeType.includes(c.fee_type.toLowerCase())
        )
      )
    );
    const allSessions = [];
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
        filteredSessions.forEach((s) => {
          allSessions.push(
            `Kishan - ${s.available_capacity} doses of ${s.vaccine} for ${s.min_age_limit}+ age at (${c.center_id}) ${c.name} - ${c.address}`
          );
        });
        return { ...c, sessions: filteredSessions };
      })
      .filter((c) => c.sessions && c.sessions.length > 0);
    if (finalCenters.length > 0) {
      logger.info('Vaccine available for kishan');
      allSessions.forEach((s) => logger.info(s));
      res.status(200).json(allSessions);
    } else {
      res.status(404).json(finalCenters);
    }
  } catch (error) {
    exceptionHandler(error, res);
  }
});

router.get('/availability/dad', async (req, res) => {
  try {
    const vaccine = ['covaxin', 'covishield'];
    const minAgeLimit = 40;
    const maxAgeLimit = 70;
    const onlyAvailable = true;
    const feeType = ['free', 'paid'];
    const districtIds = [549, 580, 780];
    const today = moment(new Date()).format('DD-MM-YYYY');

    const allResponse = await Promise.all(
      districtIds.map(async (districtId) =>
        get(
          `${process.env.COVID_API}/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${today}`
        )
      )
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
    if (finalCenters.length > 0) {
      logger.info('Vaccine available for dad');
      res.status(200).json(finalCenters);
    } else {
      res.status(404).json(finalCenters);
    }
  } catch (error) {
    exceptionHandler(error, res);
  }
});

router.get('/availability/nemo', async (req, res) => {
  try {
    const vaccine = ['covaxin', 'covishield'];
    const minAgeLimit = 50;
    const maxAgeLimit = 30;
    const onlyAvailable = true;
    const feeType = ['free', 'paid'];
    const districtIds = [549, 580, 780];

    // Enable this after july 30
    const nemoRequestDates = ['30-07-2021', '06-08-2021', '13-08-2021'];
    const paths = [];

    districtIds.forEach((districtId) => {
      nemoRequestDates.forEach((dt) => {
        paths.push(
          `${process.env.COVID_API}/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${dt}`
        );
      });
    });

    const allResponse = await Promise.all(paths.map(async (path) => get(path)));
    const allCenters = [];
    // fee_type filter
    allResponse.forEach((a) =>
      allCenters.push(
        ...(a.centers || []).filter((c) =>
          feeType.includes(c.fee_type.toLowerCase())
        )
      )
    );
    const allSessions = [];
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
        filteredSessions.forEach((s) => {
          allSessions.push(
            `Nemo - ${s.available_capacity} doses of ${s.vaccine} for ${s.min_age_limit}+ age at (${c.center_id}) ${c.name} - ${c.address}`
          );
        });
        return { ...c, sessions: filteredSessions };
      })
      .filter((c) => c.sessions && c.sessions.length > 0);
    if (finalCenters.length > 0) {
      logger.info('Vaccine available for nemo, machan');
      allSessions.forEach((s) => logger.info(s));
      res.status(200).json(allSessions);
    } else {
      res.status(404).json(finalCenters);
    }
  } catch (error) {
    exceptionHandler(error, res);
  }
});

module.exports = router;
