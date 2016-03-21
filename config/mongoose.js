var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect(config.db);

  require('../app/models/users.model');
  require('../app/models/posts.model');
  require('../app/models/comments.model');

  return db;
};
