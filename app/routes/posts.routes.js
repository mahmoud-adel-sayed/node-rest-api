var passport = require('passport'),
    posts = require('../controllers/posts.controller'),
  	multer = require('multer');

var upload = multer({
	dest: 'public/uploads/',
	limits: {fileSize: 1000000}
});

var authenticate = function(){
  return passport.authenticate('basic', { session: false });
}

module.exports = function(app){
  app.route('/api/v1/posts').
    get(authenticate() , posts.list).
    post(authenticate() , posts.create);

  app.route('/api/v1/posts/:postId').
    get(authenticate() , posts.read).
    put(authenticate() , posts.hasAuthorization , posts.update).
    delete(authenticate() , posts.hasAuthorization , posts.delete);

  app.route('/api/v1/posts/:postId/upload/image').
    post(authenticate() , posts.hasAuthorization , upload.single('image') , posts.uploadImage);

  app.param('postId' , posts.postById);
};
