var users = require('../controllers/users.controller'),
    passport = require('passport'),
		multer = require('multer');

var upload = multer({
	dest: 'public/uploads/',
	limits: {fileSize: 1000000}
});

var authenticate = function(){
  return passport.authenticate('basic', { session: false });
}

module.exports = function(app){
  app.route('/api/v1/users/create').
    post(users.signup);

  app.route('/api/v1/users/list').
    get(authenticate() , users.listUsers);

  app.route('/api/v1/users/profile/avatar').
    post(authenticate() , upload.single('image') , users.uploadImage);

  app.route('/api/v1/users/profile/edit').
		put(authenticate() , users.editProfile);

	app.route('/api/v1/users/profile/changePassword').
		put(authenticate() , users.changePassword);

  app.route('/api/v1/users/authenticate').
    post( authenticate() , function(req , res){
       res.status(200).send({status: 'success' , statusCode: 200 , message: 'authenticated' , user: req.user});
    });
};
