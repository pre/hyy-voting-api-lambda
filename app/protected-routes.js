var express = require('express'),
    lambda = require('./lambdas/vote.js');

var app = module.exports = express.Router();

app.get('/votes/test', function(req, res) {
  res.status(200).send("it works in private!");
});

// This endpoint is idempotent, ie. subsequent requests will not create
// a new vote, instead the existing vote is updated if needed.
app.post('/votes', function(req, res) {
  event = {
    token: req.headers['x-access-token'],
  };

  context = {
    done: function(success, wat) {
      return res.status(200).send({ response: wat });
    },

    fail: function(msg) {
      return res.status(401).send({response: msg });
    },
  };


  lambda.handler(event, context);
});
