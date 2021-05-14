// legacy callback style - not encouraged anymore, but you'll still see examples doing this
exports.handler = function(event, context, callback) {
  // your server-side functionality
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello world ${Math.floor(Math.random() * 10)}`
    })
  });
  };