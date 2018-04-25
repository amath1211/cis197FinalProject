var express = require('express');
var User = require('../models/user');
var isAuthenticated = require('../middlewares/isAuthenticated');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
  var accountRoutes = express.Router();

  accountRoutes.post('/signup', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var profilePicture = req.body.profilePicture ? req.body.profilePicture : '';

    return User.addUser(username, password, name, profilePicture)
      .then(function (user) {
        var payload = {
          id: user._id
        };
        var jwtToken = jwt.sign(payload, app.get('secret'));
        return res.json({success: true, token: jwtToken});
      })
      .catch(function (err) {
        return res.json({success: false, message: 'There was an error while trying to register you. Please try again.'});
      });
  });

  accountRoutes.post('/signin', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var user;

    return User.findOne({username: username})
      .then(function (user1) {
        user = user1;
        if (!user) {
          return res.json({success: false, message: 'No such user.'})
        } else {
          return User.checkLoginInfo(username, password)
        }
      })
      .then(function (successful) {
        if (successful) {
          var payload = {
            id: user._id
          };
          var jwtToken = jwt.sign(payload, app.get('secret'));
          return res.json({success: true, message: 'Login successful', token: jwtToken});
        } else {
          return res.json({success: false, message: 'Login failed. Please Try again'});
        }
      })
      .catch(function (err) {
        console.log(err);
        return res.json({success: false, message: 'There was an error. Please try again.'});
      });
  });

  return accountRoutes;

}