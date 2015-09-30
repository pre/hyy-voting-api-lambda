var express = require('express'),
    lambda = require('./lambdas/vote.js');

var app = module.exports = express.Router();

app.get('/votes/test', function(req, res) {
  res.status(200).send("it works in private!");
});

// This endpoint is idempotent, ie. subsequent requests will not create
// a new vote, instead the existing vote is updated if needed.
app.post('/votes', function(req, res) {
  event = {};
  context = {
    token: req.headers['x-access-token'],
    done: function(wat) {
      return wat;
    },
  };

  res.status(200).send(
    { response: lambda.handler(event, context) }
  );
});
