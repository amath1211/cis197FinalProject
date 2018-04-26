var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema ({
  image: { data: Buffer, contentType: String },
  owner: {type: Schema.ObjectId, required: true, ref: 'User'},
  likes: [{type: Schema.ObjectId, ref: 'User'}],
  caption: {
        text: String,
        postedBy: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    },
  comments: [{
        text: String,
        postedBy: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    }]
});

imageSchema.statics.createImage = function (currentUserId, image, caption) {
  var newImage = new this();
  newImage.owner = currentUserId;
  newImage.image = { data: image.data, contentType: image.contentType };
  newImage.likes = [];
  newImage.caption = { text: caption, postedBy: currentUserId };
  return newImage.save()
    .then(function (savedImage) {
      return savedImage.getImageInfo(currentUserId);
    });
};

imageSchema.statics.getImageInfo = function (userId) {
  var self = this;
  return self.model('User').findOne({_id: self.owner})
    .then(function (user) {
      var obj = {
        ownerName: user.username,
        ownerId: user._id,
        ownerPic: user.profilePicture,
        image: self.image,
        imageId: self._id,
        numLikes: self.likes.length,
        isLiked: (self.likes.indexOf(userId) > -1 ? true : false),
        caption: self.caption,
        comments: self.comments
      };
      return obj;
    });
};

imageSchema.statics.getUserImages = function (userId) {
  return this.find({ owner: userId });
};

imageSchema.statics.getTimeline = function (userId) {
  var self = this;
  return self.model('User').findOne({_id: userId})
    .then(function (user) {
      if (user) {
        var following = user.following;
        var followingImages = following.map(function (memer) {
          return self.find({owner: memer});
        });
        return Promise.all(followingImages);
      }
    })
    .then(function (multiArray) {
      var flattened = multiArray.reduce(function (accumulator, currentValue) {
        return accumulator.concat(currentValue);
        },
        []
      );
      return flattened;
    });
};


imageSchema.statics.likeImage = function (currentUserId, imageId) {
  var img;
  var self = this;
  return self.findOne({_id: imageId})
    .then(function (img1) {
      img = img1;
      var userIndex = img.likes.indexOf(currentUserId);
      if (userIndex > -1) {
        img.likes.splice(userIndex, 1);
      } else {
        img.likes.push(currentUserId);
      }
      img.save();
    })
    .then(function () {
      return img.getImageInfo(currentUserId);
    });
};

imageSchema.statics.addComment = function (text, userId, imageId) {
  var user;
  var self = this;
  return this.model('User').findOne({_id: userId})
    .then(function (user1) {
      user = user1;
      return self.findOne({_id: imageId});
    })
    .then(function (image) {
      var commentObj = {
        text: text,
        postedBy: user._id
      };
      self.comments.push(commentObj);
      return image.save();
    });
};

module.exports = mongoose.model('Image', imageSchema);