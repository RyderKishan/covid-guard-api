const express = require('express');
const { pick } = require('ramda');
const Yup = require('yup');
const queryString = require('query-string');

const { get } = require('../utils/request');
const client = require('../utils/client');
const exceptionHandler = require('../utils/exceptionHandler');

const EXPIRY = (process.env.REDIS_KEY_EXPIRE_MINS || 30) * 60;

const router = express.Router();

router.get('/states', async (req, res) => {
  try {
    let response;
    const path = '/admin/location/states';
    if (client.status === 'ready') {
      response = JSON.parse(await client.get(path));
    }
    if (response) {
      res.status(200).json(response);
      return;
    }
    response = await get(`${process.env.COVID_API}/admin/location/states`);
    await client.set(path, JSON.stringify(response), 'ex', EXPIRY);
    res.status(200).json(response);
  } catch (error) {
    exceptionHandler(error, res);
  }
});

router.get('/districts', async (req, res) => {
  try {
    const qParams = pick(
      ['state'],
      queryString.parse(req.url.slice(req.url.indexOf('?')), {
        arrayFormat: 'bracket-separator',
        parseBooleans: true,
        parseNumbers: true
      })
    );
    const { state } = await Yup.object()
      .shape({
        state: Yup.number().required()
      })
      .validateSync(qParams);

    let response;
    const path = `/admin/location/districts/${state}`;
    if (client.status === 'ready') {
      response = JSON.parse(await client.get(path));
    }
    if (response) {
      res.status(200).json(response);
      return;
    }
    response = await get(`${process.env.COVID_API}${path}`);
    await client.set(path, JSON.stringify(response), 'ex', EXPIRY);
    res.status(200).json(response);
  } catch (error) {
    exceptionHandler(error, res);
  }
});

router.get('/centers', async (req, res) => {
  try {
    const qParams = pick(
      ['district', 'dateRange'],
      queryString.parse(req.url.slice(req.url.indexOf('?')), {
        arrayFormat: 'bracket-separator',
        parseBooleans: true,
        parseNumbers: true
      })
    );
    const { district, dateRange } = await Yup.object()
      .shape({
        dateRange: Yup.string().required().length(10),
        district: Yup.array().of(Yup.number()).required().min(1)
      })
      .validateSync(qParams);

    const paths = district.map(
      (districtId) =>
        `/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${dateRange}`
    );
    const redisResponse = await Promise.all(
      paths.map(async (path) => client.get(path))
    );
    const allResponse = await Promise.all(
      paths.map(async (path, ind) => {
        if (redisResponse[ind])
          return Promise.resolve(JSON.parse(redisResponse[ind]));
        return get(`${process.env.COVID_API}${path}`);
      })
    );
    await Promise.all(
      paths.map(async (path, ind) => {
        if (redisResponse[ind]) return Promise.resolve();
        return client.set(path, JSON.stringify(allResponse[ind]), 'ex', EXPIRY);
      })
    );
    const allCenters = [];
    allResponse.forEach((resp) => {
      allCenters.push(...(resp.centers || []));
    });
    res.status(200).json(allCenters);
  } catch (error) {
    exceptionHandler(error, res);
  }
});

module.exports = router;
