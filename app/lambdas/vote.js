var config  = require('./config'),
    jwt     = require('jsonwebtoken');

exports.handler = function(event, context) {
  console.log("has event:", event);

  var decoded = jwt.verify(event.token, config.secret, {});

  console.log('jwt decoded: ', decoded);

  return context.done(null, '(inside lambda) it works! user: ' + decoded.id);
};
