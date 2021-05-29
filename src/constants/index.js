const moment = require('moment');

const dateFormat = 'DD-MM-YYYY';

const dateRanges = [
  {
    value: `${moment(new Date()).format(dateFormat)}`,
    label: 'This week'
  },
  {
    value: `${moment(new Date()).add(7, 'days').format(dateFormat)}`,
    label: 'Next week'
  },
  {
    value: `${moment(new Date()).add(14, 'days').format(dateFormat)}`,
    label: '3rd week'
  }
];

module.exports = {
  dateRanges
};
