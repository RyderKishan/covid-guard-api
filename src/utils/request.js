const R = require('ramda');
const axios = require('axios');

function CustomException(error) {
  return {
    message: R.pathOr('', ['message'], error),
    status: R.pathOr(500, ['response', 'status'], error),
    url: R.pathOr(500, ['response', 'config', 'url'], error),
    statusText: R.pathOr('', ['response', 'statusText'], error),
    data: R.pathOr(null, ['response', 'data'], error),
  };
}

const get = (endpoint, headers, options = {}) => {
  const commonHeaders = {
    'Content-Type': 'application/json',
  };
  const commonOptions = {
    method: 'GET',
    ...options,
  };
  return axios
    .get(endpoint, {
      ...commonOptions,
      headers: { ...commonHeaders, ...headers },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new CustomException(error);
    });
};

module.exports = {
  get,
};
