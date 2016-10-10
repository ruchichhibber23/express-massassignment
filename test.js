'use strict';

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var massAssign = require('mongoose-mass-assign');

app.disable('x-powered-by');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  priority: {
    type: String,
    protect: true,
    default: "low"
  }
});

UserSchema.plugin(massAssign);
var User = mongoose.model('User', UserSchema, 'contactlist');

app.post('/', function(req, res) {
  console.log("Insert " + req.body);
  var user = new User;
  user.massAssign({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number
  });
  user.save(function(err, data) {
    if(err) {
      res.json(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Your app listening at http://localhost:%s', port);
});