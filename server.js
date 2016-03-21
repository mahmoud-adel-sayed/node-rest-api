process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose(),
    server = express(),
    passport = passport();

server.listen(3000);
console.log('Server is running on http://localhost:3000');

module.exports = server;
