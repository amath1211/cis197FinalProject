var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middlewares/isAuthenticated');
var Image = require('../models/image');

module.exports = function (app) {
  app.use(isAuthenticated(app));

  router.get('/', function (req, res) {
    var user = req.user;

    return Image.getTimeline(user._id)
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

  return router;
};