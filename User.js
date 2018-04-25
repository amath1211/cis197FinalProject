var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema ({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: String,
  profilePicture: { data: Buffer, contentType: String },
  images: [{type: Schema.ObjectId, ref: 'Image'}],
  following: [{type: Schema.ObjectId}],
  followers: [{type: Schema.ObjectId}]
});

userSchema.statics.addUser = function (username, password, name, picture) {
  var newUser = new this;
  newUser.username = username;
  newUser.name = name;
  newUser.profilePicture = picture;
  return bcrypt.hash(password, 1)
    .then(function (hash) {
      newUser.password = hash;
      return newUser.save();
    });
};

userSchema.statics.checkLoginInfo = function (username, password) {
  return this.findOne({username: username})
    .then(function (user) {
      if (!user) {
        throw new Error ('User does not exist.')
      } else {
        return bcrypt.compare(password, user.password)
          .then( function (res) {
            return res;
          });
      }
    });
};

userSchema.statics.updateProfileInfo = function (userId, name, profilePicture) {
  return this.findOne({_id: userId})
    .then(function (user) {
      user.name = name;
      user.profilePicture = profilePicture;
      return user;
    });
    .then(function (user) {
      return user.save();
    });
};

userSchema.statics.addProfilePic = function (userId, image) {
  return this.findOne({_id: userId})
    .then(function (user) {
      user.profilePicture = image;
      return user;
    });
    .then(function (user) {
      return user.save();
    });
};

userSchema.statics.getProfileById = function (id, currentUserId) {
  return this.findOne({_id: id})
    .then(function (user) {
      if (!user) {
        throw new Error('No such user with id');
      } else {
        var isFollower = user.followers.indexOf(currentUserId) > -1;
        return {
          name: user.name,
          species: user.species,
          image: user.image,
          followers: user.followers,
          following: user.following,
          isFollowing: isFollower
        };
      }
    });
};

userSchema.statics.follow = function (followerId, followingId) {
  var user1;
  var user2;
  var following;

  var self = this;
  return self.findOne({_id: followerId})
    .then(function (user) {
      user1 = user;
      return self.findOne({_id: followingId});
    })
    .then(function (user) {
      user2 = user;
      var u2Index = user1.following.indexOf(followingId);
      var u1Index = user2.followers.indexOf(followerId);

      if (u1Index > -1) {
        user1.following.splice(u2Index, 1);
        user2.followers.splice(u1Index, 1);
        following = 'unfollowing';
      } else {
        user1.following.push(followingId);
        user2.followers.push(followerId);
        following = 'following';
      }
      return
    })
    .then(function () {
      return user1.save();
    })
    .then(function () {
      return user2.save();
    })
    .then(function () {
      return following;
    });
};

module.exports = mongoose.model('User', userSchema);