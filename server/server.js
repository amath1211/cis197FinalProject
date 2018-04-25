var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var config = require('./config');

var accountRoutes = require('./routes/account');
var imageRoutes = require('./routes/image');
var timelineRoutes = require('./routes/timeline');
var profileRoutes = require('./routes/profile');

mongoose.connect(config.database);

mongoose.Promise = global.Promise;

var app = express();

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/account', accountRoutes(app));

app.use('/profile', profileRoutes(app));

app.use('/image', imageRoutes(app));

app.use('/timeline', timelineRoutes(app));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on ' + (process.env.PORT || 3000));
});

module.exports = app;
