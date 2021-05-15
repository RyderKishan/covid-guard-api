const fetch = require('node-fetch');
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
  'content-type': 'application/json',
  'accept-language': 'en_US',
  origin: 'https://selfregistration.cowin.gov.in',
  referer: 'https://selfregistration.cowin.gov.in/',
  authorization: `Bearer ${process.env.TOKEN || ''}`,
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  // host: 'covid-guard-api-prod.us-east-1.elasticbeanstalk.com',
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
  console.log('headers', response.headers);
  console.log('type', response.type);
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
