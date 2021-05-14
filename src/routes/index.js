const vaccine = require('./vaccine');

exports.initialize = (router) => {
  vaccine.bind(router);
  router.get('/ping', (req, res) => {
    res
      .status(200)
      .json({
        message: 'Application UP!',
        timeStamp: new Date(),
      });
  });
};
