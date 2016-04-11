var User = require('mongoose').model('Users'),
    error = require('./errors.controller'),
    AWS = require('../../config/aws');

exports.signup = function(req , res){
  var user = new User(req.body);

  user.save(function(err , user){
    if(err){
      var message = error.getErrorMessage(err);
      return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: message });
    }
    res.json({ id: user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email });
  });
};

exports.uploadImage = function(req , res){
  var userId = req.user._id;
	if(req.file){
    User.findOneAndUpdate({_id: userId} , { $set: {image: req.file.filename , aws: 'https://s3.amazonaws.com/mahmoudadel/'+req.file.filename} } , { new: true , runValidators: true } , function(err , profile){
  		if(err) return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: error.getErrorMessage(err) });
      AWS.onFileUploadData(req.file.filename , req.file.path , req.file.mimetype);
  		res.json({status: 'Success' , statusCode: 200 , image: profile.image , aws: profile.aws});
  	});
	}else{
    res.status(400).send({ status: 'Failed' , statusCode: 400 , message: 'No image selected' });
  }
};

exports.listUsers = function(req , res){
  User.find({} , { username: 1 , aws: 1 , image: 1 , email: 1 } , function(err , users){
    if(err){
      var message = error.getErrorMessage(err);
      return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: message });
    }else{
      res.json(users);
    }
  });
};

exports.editProfile = function(req , res){
	var userId = req.user._id;
	var username = req.body.username,
      firstName = req.body.firstName,
      lastName = req.body.lastName,
      email = req.body.email;

	User.findOneAndUpdate({_id: userId} , { $set: {username: username , firstName: firstName , lastName: lastName , email: email} } , { new: true , runValidators: true } , function(err , profile){
		if(err){
      var message = error.getErrorMessage(err);
      return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: message });
    }else{
      res.json(profile);
    }
	});
};

exports.changePassword = function(req , res){
	var userId = req.user._id,
			oldPassword = req.body.oldPass,
			newPassword = req.body.newPass,
			confirmPassword = req.body.confirmPass;

	if(!oldPassword){
		return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: 'Please enter your old password' });
	}else if(newPassword !== confirmPassword){
		return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: 'new & confirm password do not match' });
	}else{
		User.findOne({_id: userId} , function(err , user){
			if(err){
				return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: error.getErrorMessage(err) });
			}else if(!user.authenticate(oldPassword)){
				return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: 'your old password is wrong' });
			}else{
				user.password = newPassword;
				user.save(function(err , newuser){
					if(err) return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: error.getErrorMessage(err) });
					res.status(200).send({status: 'Success' , statusCode: 200 , message: 'Password changed successfully'});
				});
			}
		});
	}
};
