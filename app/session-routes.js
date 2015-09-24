var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

// XXX: a database of issued tokens :).
var issuedTokens = [{
  id: 1,
  token: 'abc',
  user: {
    id: 100,
    email: "lehti.koivu@helsinki.fi",
    dontIncludeThis: "do not include this value"
  },
  response: {
    goodToken: "from node",
    faculty: {
      name: "Humanistinen Nodekunta"
    },
    candidates: {
      "url": "/mock_api/hum_tdk-candidates.json"
    },
    alliances: {
      url: "/mock_api/hum_tdk-alliances.json"
    }
  }
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'dontIncludeThis'), config.secret, { expiresInMinutes: 60*5 });
}

function error(message) {
  return { error: { message: message } }
}

app.post('/sessions/create', function(req, res) {
  var token = req.body.token;

  if (!token) {
    return res.status(400).send(error("Token missing"));
  }

  var issuedToken = _.find(issuedTokens, {token: token});

  if (!issuedToken) {
    return res.status(401).send(error("Token is invalid"));
  }

  res.status(201).send({
    jwt: createToken(issuedToken.user),
    details: issuedToken.response
  });
});
