const { get } = require('../utils/request');

exports.bind = (router) => {
  router.get('/cowin/states', async (req, res) => {
    // try {
    const path = '/admin/location/states';
    get(`${process.env.COVID_API}${path}`)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log('err', err);
      });
    // } catch (e) {
    // res.status(500).json({
    //   status: 500,
    //   message: JSON.stringify(e),
    // });
    // }
  });
};
