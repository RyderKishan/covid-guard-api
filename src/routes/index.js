const health = require('./health');
const cowin = require('./cowin');
const vaccine = require('./vaccine');

exports.bind = (app) => {
  app.use(health);
  app.use('/cowin', cowin);
  app.use('/vaccine', vaccine);
};
