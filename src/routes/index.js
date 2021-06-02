const cowin = require('./cowin');
const check = require('./check');
const vaccine = require('./vaccine');

exports.bind = (app) => {
  app.use('/check', check);
  app.use('/cowin', cowin);
  app.use('/vaccine', vaccine);
};
