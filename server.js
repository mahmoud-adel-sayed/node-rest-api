process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var cluster = require('cluster');

if(cluster.isMaster){
  require('os').cpus().forEach(function(){
    cluster.fork();
  });

  cluster.on('exit' , function(worker , code , signal){
    cluster.fork();
  })

}else{

  var mongoose = require('./config/mongoose'),
      express = require('./config/express'),
      passport = require('./config/passport');

  var db = mongoose(),
      server = express(),
      passport = passport();

  var port = normalizePort(process.env.PORT || '3000');

  server.listen(port);

  module.exports = server;

  console.log('Server is running on http://localhost:' + port);
  
  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

}
