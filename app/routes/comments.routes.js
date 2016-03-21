var comments = require('../controllers/comments.controller'),
    passport = require('passport');

module.exports = function(app){
	app.route('/api/v1/posts/:postId/comments').
		get(passport.authenticate('basic', { session: false }) , comments.list).
		post(passport.authenticate('basic', { session: false }) , comments.create);
};
