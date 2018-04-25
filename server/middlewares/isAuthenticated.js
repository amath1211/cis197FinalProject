var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = function (app) {
  return function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['auth-token'];

    if (token) {

      var secret = app.get('secret');

      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.'});
        } else {
          User.findOne({_id: decoded.id})
            .then(function (user) {
              req.user = user;
              next();
            });
        }
      });
    } else {
      res.status = 403;
      return res.json({ success: false, message: 'No token provided'});
    }
  };
};
