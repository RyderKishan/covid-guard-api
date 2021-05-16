const health = require('./health');
const cowin = require('./cowin');
const check = require('./check');
const vaccine = require('./vaccine');
const availability = require('./availability');

exports.bind = (app) => {
  app.use(health);
  app.use('/check', check);
  app.use('/cowin', cowin);
  app.use('/vaccine', vaccine);
  app.use('/availability', availability);
};
