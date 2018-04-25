var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middlewares/isAuthenticated');
var Image = require('../models/image');
var User = require('../models/user');

module.exports = function (app) {
  app.use(isAuthenticated(app));

  router.post('/:id/follow', function (req, res) {
    return User.follow(req.params.id, req.user._id)
      .then(function (following) {
        return res.json({res: 'successful', data: following});
      })
      .catch(function (err) {
        return res.json({res: 'failure', data: err});
      });
  });

  router.post('/edit', function (req, res) {
    var name = req.body.name;
    var profilePicture = req.body.image;
    var userId = req.params.id;
    return User.updateProfileInfo(userId, name, profilePicture)
      .then(function (user) {
        return res.json({res: 'successful', data: {name: user.name, profilePicture: user.profilePicture}});
      })
      .catch(function (err){
        res.json({ res: 'failure', data: err});
      });
  });

  router.get('/:id?/images', function (req, res) {
    var userId = req.params.id ? req.params.id : req.user._id;

    return Image.getTimeline(userId)
      .then(function (images) {
        return images.sort(function (img1, img2) {
          var img1Date = img1.created_at ? new Date(img1.created_at) : new Date(0);
          var img2Date = img2.created_at ? new Date(img2.created_at) : new Date(0);
          return img2Date - img1Date;
        });
      })
      .then(function (images) {
        var imagesInfo = images.map(function (image) {
          return Image.getImageInfo(userId);
        });
        return Promise.all[imagesInfo];
      })
      .then(function (imagesInfo) {
        return res.json({ res: 'success', data: imagesInfo});
      })
      .catch(function (err) {
        return res.json({ res: 'failure', data: err});
      });
  });
  router.get('/:id?/info', function (req, res) {
    var userId = req.params.id ? req.params.id : req.user._id;

    User.getProfileInfo(userId, req.params.id)
      .then(function (profile) {
        return res.json({res: 'successful', data: profile});
      })
      .catch(function (err) {
        return res.json({res: 'failure', data: err});
      });
  });

  return router;
};