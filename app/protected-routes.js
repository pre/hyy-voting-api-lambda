var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config');

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
  res.status(200).send("successful vote!");
});
