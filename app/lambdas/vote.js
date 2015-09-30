var config  = require('./config'),
    jwt     = require('jsonwebtoken');

exports.handler = function(event, context) {
  console.log("has event:", event);
  var decoded;

  try {
    decoded = jwt.verify(event.token, config.secret, {});
  } catch (e) {
    console.log('Failed: ', e);
    context.fail('Something went wrong');
  }

  console.log('jwt decoded: ', decoded);

  return context.done(null, '(inside lambda) it works! user: ' + decoded.id);
};
