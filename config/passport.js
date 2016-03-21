var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function(){
  var User = require('mongoose').model('Users');

  passport.use(new BasicStrategy(
    function(username , password , done){
      User.findOne({username: username} , function(err , user){
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.authenticate(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
};
