var mongoose = require('mongoose'),
    Comments = mongoose.model('Comments'),
    error = require('./errors.controller');

exports.create = function(req , res){
	var comment = new Comments(req.body);
	comment.userId = req.user;
	comment.postId = req.post._id;

	comment.save(function(err , comment){
		if(err){
      var message = error.getErrorMessage2(err);
      return res.status(400).send({ status: 'Failed' , message: message });
		}else{
			res.json(comment);
		}
	});
};

exports.list = function(req , res){
	Comments.find({postId: req.post._id}).sort('-created').populate('userId' , 'username').exec(function(err , comments){
		if(err){
      var message = error.getErrorMessage2(err);
      return res.status(400).send({ status: 'Failed' , message: message });
		}else{
			res.json(comments);
		}
	});
};
