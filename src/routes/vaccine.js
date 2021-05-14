const fetch = require('node-fetch');

const { get } = require('../utils/request');

exports.bind = (router) => {
  router.get('/vaccine/availability', async (req, res) => {
    // try {
      const {
        vaccine = 'covaxin',
        min_age_limit = 45,
        only_available = 'false',
        fee_type = 'free',
        state_id = 1,
        district_ids = '[]',
      } = req.query;
      console.log('req.query', req.query);
      const today = new Date().toLocaleDateString().replace(/\//g, '-');
      console.log('today', today);
      const stateId = Number(state_id);
      console.log('stateId', stateId);
      const minAgeLimit = Number(min_age_limit);
      console.log('minAgeLimit', minAgeLimit);
      const onlyAvailable = only_available === 'true';
      console.log('onlyAvailable', onlyAvailable);
      const districtIds = JSON.parse(district_ids);
      console.log('districtIds', districtIds);
      const allResponse = await Promise.all(
        districtIds.map((districtId) =>
          get(
            `${process.env.COVID_API}/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${today}`
          )
        )
      );
      console.log('allResponse');
      const allCenters = [];
      console.log('allCenters', allCenters);
      // fee_type filter
      allResponse.forEach((a) =>
        allCenters.push(
          ...(a.centers || []).filter(
            (c) => (c.fee_type || '').toLowerCase() === fee_type
          )
        )
      );
      console.log('allCenters 2');
      // min_age_limit filter
      const finalCenters = allCenters
        .map((c) => {
          const filteredSessions = (c.sessions || []).filter(
            (s) =>
              s.min_age_limit === minAgeLimit &&
              (s.vaccine || '').toLowerCase() === vaccine &&
              (onlyAvailable ? s.available_capacity > 0 : true)
          );
          // console.log('filteredSessions');
          return { ...c, stateId, sessions: filteredSessions };
        })
        .filter((c) => c.sessions && c.sessions.length > 0);
      console.log('allCenters 3');
      res.status(200).json(finalCenters);
    // } catch (exeption) {
    //   res.status(500).json({
    //     status: 500,
    //     message: JSON.stringify(exeption),
    //   });
    // }
  });
};
