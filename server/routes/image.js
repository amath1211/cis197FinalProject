var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middlewares/isAuthenticated');
var Image = require('../models/image');

module.exports = function (app) {
  app.use(isAuthenticated(app));

  router.post('/upload', function (req, res) {
    return Image.createImage(req.user._id, req.body.image, req.body.caption)
      .then(function (image) {
        return res.json({res: 'Image successfully uploaded', data: image});
      })
      .catch(function (err) {
        return res.json({res: 'Image not successfully uploaded', data: err});
      });
  });

  router.post('/:id/favorite', function (req, res) {
    return Image.likeImage(req.user._id, req.params.id)
      .then(function (likedImage) {
        return res.json({res: 'successful', data: likedImage});
      })
      .catch(function (err) {
        return res.json({res: 'failure', data: err});
      });
  });

  router.post('/:id/comment', function (req, res) {
    var userId = req.params.id;
    var text = req.body.text;
    var imageId = req.params.imageId;
    return Image.addComment(text, userId, imageId)
      .then(function (image) {
        return res.json({res: 'successful', data: image});
      })
      .catch(function (err) {
        return res.json({res: 'failure', data: err});
      });
  });

  return router;
};