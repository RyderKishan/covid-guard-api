const { get } = require('../utils/request');

exports.bind = (router) => {
  router.get('/cowin/states', async (req, res) => {
    try {
      const path = '/admin/location/states';
      const response = await get(`${process.env.COVID_API}${path}`);
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: JSON.stringify(e),
      });
    }
  });
};
