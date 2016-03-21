var mongoose = require('mongoose'),
    Posts = mongoose.model('Posts'),
    error = require('./errors.controller');

exports.create = function(req , res){
  var post = new Posts(req.body);
  post.creator = req.user;

  post.save(function(err , post){
    if(err){
      var message = error.getErrorMessage2(err);
      return res.status(400).send({ status: 'Failed' , message: message });
    }else{
      res.json(post);
    }
  });
};

exports.list = function(req , res){
  Posts.find().sort('-created').populate('creator' ,'firstName lastName username').exec(function(err , posts){
    if(err){
      var message = error.getErrorMessage2(err);
      return res.status(400).send({ status: 'Failed' , message: message });
    }else{
      res.json(posts);
    }
  });
};

exports.postById = function(req , res , next , id){
  Posts.findById({_id: id}).populate('creator' ,'firstName lastName username').exec(function(err , post){
    if(err){
			return next(err);
		}
		if(!post){
			return next(new Error('post not found'));
		}
		req.post = post;
		next();
  });
};

exports.read = function(req , res){
	res.json(req.post);
};

exports.update = function(req , res){
	var post = req.post;
	post.title = req.body.title;
	post.content = req.body.content;

	post.save(function(err , post){
		if(err){
      var message = error.getErrorMessage2(err);
      return res.status(400).send({ status: 'Failed' , message: message });
		}else{
			res.json(post);
		}
	});
};

exports.delete = function(req , res){
	var post = req.post;

	post.remove(function(err , post){
		if(err){
      var message = error.getErrorMessage2(err);
      return res.status(400).send({ status: 'Failed' , message: message });
		}else{
			res.json(post);
		}
	});
};

exports.hasAuthorization = function(req , res , next){
	if(req.post.creator.id !== req.user.id){
		return res.status(403).send({ status: 'Failed' , message: 'User is not authorized.' });
	}
	next();
};
