var express = require('express');

var app = module.exports = express.Router();

app.post('/tokens', function(req, res) {
  res.status(200).send("Link has been sent!");
});
