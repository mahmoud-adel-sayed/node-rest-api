var passport = require('passport'),
    posts = require('../controllers/posts.controller');

module.exports = function(app){
  app.route('/api/v1/posts').
    get(passport.authenticate('basic', { session: false }) , posts.list).
    post(passport.authenticate('basic', { session: false }) , posts.create);

  app.route('/api/v1/posts/:postId').
    get(passport.authenticate('basic', { session: false }) , posts.read).
    put(passport.authenticate('basic', { session: false }) , posts.hasAuthorization , posts.update).
    delete(passport.authenticate('basic', { session: false }) , posts.hasAuthorization , posts.delete);

  app.param('postId' , posts.postById);
};
