var users = require('../controllers/users.controller'),
    passport = require('passport');

module.exports = function(app){
  app.route('/api/v1/users/create').
    post(users.signup);

  app.route('/api/v1/users/profile/edit').
		put(passport.authenticate('basic', { session: false }) , users.editProfile);

	app.route('/api/v1/users/profile/changePassword').
		put(passport.authenticate('basic', { session: false }) , users.changePassword);
};
