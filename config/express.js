var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    compression = require('compression'),
    passport = require('passport'),
    cors = require('cors');

module.exports = function(){
  var app = express();

  if(process.env.NODE_ENV == 'development'){
    app.use(logger('dev'));
  }else if(process.env.NODE_ENV == 'production'){
    app.use(compression());
  }

  app.use(methodOverride());
  app.use( bodyParser.urlencoded({ extended: true }) );
  app.use( bodyParser.json() );
  app.use(cors());

  app.use(passport.initialize());

  //routes
  require('../app/routes/users.routes')(app);
  require('../app/routes/posts.routes')(app);
  require('../app/routes/comments.routes')(app);

  // catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.send(err.message);
	});

  return app;
};
