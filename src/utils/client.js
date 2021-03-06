const Redis = require('ioredis');

const client = new Redis({
  port: process.env.REDIS_PORT || 6379,
  retryStrategy(times) {
    const delay = times * 1000;
    if (times > 5) return undefined;
    return delay;
  },
  maxRetriesPerRequest: 5000,
  password: process.env.REDIS_PASSWORD || undefined,
  host: process.env.REDIS_HOST || '',
  db: 0
});

client.on('ready', () => {
  console.log('Redis - Ready');
});

client.on('connect', () => {
  console.log('Redis - Connect');
});

client.on('reconnecting', () => {
  console.log('Redis - Reconnecting');
});

client.on('error', (error) => {
  console.log('Redis - Error', JSON.stringify(error));
});

client.on('end', () => {
  console.log('Redis - End');
});

client.on('warning', () => {
  console.log('Redis - Warning');
});

module.exports = client;
