const R = require('ramda');

const exceptionHandler = (error, res) => {
  const originalUrl = R.pathOr('', ['req', 'originalUrl'], res);
  const customException = {
    message: R.propOr('', 'message', error),
    status: R.propOr(500, 'status', error),
    url: R.propOr(originalUrl, 'url', error),
    statusText: R.propOr('', 'statusText', error),
    data: R.propOr('', 'data', error),
  };
  res.status(customException.status).json(customException);
};

module.exports = exceptionHandler;
