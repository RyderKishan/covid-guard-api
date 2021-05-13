const config = {
  restapi: process.env.REST_API || 'https://jsonplaceholder.typicode.com',
  serverPort: process.env.PORT || 7400,
  authenticationStrategy: 'google'
};

module.exports = config;
