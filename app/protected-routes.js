var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config'),
    lambda = require('./lambdas/vote.js');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/votes', jwtCheck);

app.get('/votes/test', function(req, res) {
  res.status(200).send("it works in private!");
});

// This endpoint is idempotent, ie. subsequent requests will not create
// a new vote, instead the existing vote is updated if needed.
app.post('/votes', function(req, res) {
  console.log("Decoded token:", req.user);

  event = {};
  context = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAwLCJlbWFpbCI6ImxlaHRpLmtvaXZ1QGhlbHNpbmtpLmZpIiwiaWF0IjoxNDQzNjI5ODMwLCJleHAiOjE0NDM2NDc4MzB9.SEX3kwXBX9wNa5In8AB-cn4EaYtHrvfbhJScUg3uFTI',
    done: function(wat) {
      return wat;
    },
  };

  res.status(200).send(
    { response: lambda.handler(event, context) }
  );
});
