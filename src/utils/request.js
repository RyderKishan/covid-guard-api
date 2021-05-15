const fetch = require('node-fetch');
const uuid = require('uuid').v4;

const { pathOr } = require('ramda');

class CustomException extends Error {
  constructor(error) {
    super(error);
    this.message = 'CustomException';
    this.data = error.data;
    this.status = error.status;
    this.url = error.url;
    this.statusText = error.statusText;
  }
}

const ErrorObject = async (response) => {
  const error = {
    status: pathOr(500, ['status'], response),
    url: pathOr('', ['url'], response),
    statusText: pathOr('', ['statusText'], response),
  };
  try {
    error.data = await response.json();
  } catch (e) {
    error.empty = true;
  }
  return error;
};

const commonHeaders = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  authority: 'cdn-api.co-vin.in',
  host: 'cdn-api.co-vin.in',
  connection: 'close',
  pragma: 'no-cache',
  'user-agent': 'PostmanRuntime/7.28.0',
  'cache-control': 'no-cache',
  'postman-token': uuid(),
  'Accept-Language': 'en_US',
  'content-type': 'application/json',
  'accept-encoding': 'gzip, deflate, br',
};

const get = async (endpoint, headers, options = {}) => {
  const commonOptions = {
    method: 'GET',
    ...options,
  };
  const response = await fetch(endpoint, {
    ...commonOptions,
    headers: { ...commonHeaders, ...headers },
  });
  if (response.ok && response.status === 200) {
    return response.json();
  }
  const errorObject = await ErrorObject(response);
  throw new CustomException(errorObject);
};

const del = async (endpoint, headers, options = {}) => {
  const commonOptions = {
    method: 'DELETE',
    ...options,
  };
  const response = await fetch(endpoint, {
    ...commonOptions,
    headers: { ...commonHeaders, ...headers },
  });
  if (response.ok && response.status === 200) {
    return response.json();
  }
  const errorObject = await ErrorObject(response);
  throw new CustomException(errorObject);
};

const post = async (endpoint, body, headers, options = {}) => {
  const commonOptions = {
    method: 'POST',
    ...options,
  };
  const response = await fetch(endpoint, {
    ...commonOptions,
    body: JSON.stringify(body),
    headers: { ...commonHeaders, ...headers },
  });
  if (response.ok && response.status === 200) {
    return response.json();
  }
  const errorObject = await ErrorObject(response);
  throw new CustomException(errorObject);
};

const put = async (endpoint, body, headers, options = {}) => {
  const commonOptions = {
    method: 'PUT',
    ...options,
  };
  const response = await fetch(endpoint, {
    ...commonOptions,
    body: JSON.stringify(body),
    headers: { ...commonHeaders, ...headers },
  });
  if (response.ok && response.status === 200) {
    return response.json();
  }
  const errorObject = await ErrorObject(response);
  throw new CustomException(errorObject);
};

module.exports = { get, post, del, put };
