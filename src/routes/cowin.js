const { get } = require('../utils/request');
const client = require('../utils/client');

const EXPIRY = (process.env.REDIS_KEY_EXPIRE_MINS || 30) * 60;

exports.bind = (router) => {
  router.get('/cowin/states', async (req, res) => {
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
    } catch (e) {
      res.status(500).json(e);
    }
  });
};
