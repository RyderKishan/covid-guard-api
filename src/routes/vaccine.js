const { get } = require('../utils/request');

exports.bind = (router) => {
  router.get('/vaccine/availability', async (req, res) => {
    try {
      const {
        vaccine = 'covaxin',
        min_age_limit = 45,
        only_available = 'false',
        fee_type = 'free',
        state_id = 1,
        district_ids = '[]',
      } = req.query;
      const today = new Date().toLocaleDateString().replace(/\//g, '-');
      const stateId = Number(state_id);
      const minAgeLimit = Number(min_age_limit);
      const onlyAvailable = only_available === 'true';
      const districtIds = JSON.parse(district_ids);
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
          ...(a.centers || []).filter(
            (c) => (c.fee_type || '').toLowerCase() === fee_type
          )
        )
      );
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
      res.status(200).json(finalCenters);
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: JSON.stringify(e),
      });
    }
  });
};
