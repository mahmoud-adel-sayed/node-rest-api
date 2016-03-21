var User = require('mongoose').model('Users'),
    error = require('./errors.controller');

exports.signup = function(req , res){
  var user = new User(req.body);

  user.save(function(err , user){
    if(err){
      var message = error.getErrorMessage(err);
      return res.status(400).send({ status: 'Failed' , message: message });
    }
    res.json(user);
  });
};

exports.editProfile = function(req , res){
	var userId = req.user._id;
	var profile = req.body;

	User.findOneAndUpdate({_id: userId} , profile , { new: true , runValidators: true } , function(err , profile){
		if(err){
      var message = error.getErrorMessage(err);
      return res.status(400).send({ status: 'Failed' , message: message });
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
		return res.status(400).send({ message: 'Please enter your old password' });
	}else if(newPassword !== confirmPassword){
		return res.status(400).send({ message: 'new & confirm password do not match' });
	}else{
		User.findOne({_id: userId} , function(err , user){
			if(err){
				return res.status(400).send({ message: error.getErrorMessage(err) });
			}else if(!user.authenticate(oldPassword)){
				return res.status(400).send({ message: 'your old password is wrong' });
			}else{
				user.password = newPassword;
				user.save(function(err , newuser){
					if(err) return res.status(400).send({ message: error.getErrorMessage(err) });
					res.status(200).send('Password changed successfully');
				});
			}
		});
	}
};
