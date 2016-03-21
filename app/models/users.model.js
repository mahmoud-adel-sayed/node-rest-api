var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    required : 'First name is required'
  },
	lastName: {
    type: String,
    required: 'Last name is required'
  },
  username: {
    type: String,
		trim: true,
		unique: true,
		required: 'Username is required'
  },
  email: {
    type: String,
    required: 'Email is required',
    index: true,
    match: [ /.+\@.+\..+/ , 'Please fill a valid e-mail address']
  },
  password: {
    type: String,
    required: 'Password is required',
    validate:{
      validator: function(password){
        return password && password.length > 6
      },
      message: 'Password should be longer than 6 characters'
    }
  },
  salt: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// hashing password
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('Users' , UserSchema);
