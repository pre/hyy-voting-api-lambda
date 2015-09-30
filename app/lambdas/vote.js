var config  = require('./config'),
    jwt     = require('jsonwebtoken');

exports.handler = function(event, context) {
  var decoded = jwt.verify(context.token, config.secret, {});

  console.log('jwt decoded: ', decoded);

  return context.done('(inside lambda) it works! user: ' + decoded.id);
};
