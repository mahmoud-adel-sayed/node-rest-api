var comments = require('../controllers/comments.controller'),
    passport = require('passport');

var authenticate = function(){
  return passport.authenticate('basic', { session: false });
}

module.exports = function(app){
	app.route('/api/v1/posts/:postId/comments').
		get(authenticate() , comments.list).
		post(authenticate() , comments.create);
};
