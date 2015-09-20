var express = require('express');

var app = module.exports = express.Router();

app.get('/api/public/test', function(req, res) {
  res.status(200).send("It works in public!");
});
