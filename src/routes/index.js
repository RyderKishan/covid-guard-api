const cowin = require('./cowin');
const vaccine = require('./vaccine');

exports.initialize = (router) => {
  cowin.bind(router);
  vaccine.bind(router);
  router.get('/ping', (req, res) => {
    res.status(200).json({
      message: 'Application UP!',
      env: process.env,
      timeStamp: new Date(),
    });
  });
};
