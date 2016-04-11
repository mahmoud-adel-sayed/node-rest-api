var mongoose = require('mongoose'),
    Posts = mongoose.model('Posts'),
    error = require('./errors.controller'),
    del = require('del'),
  	AWS = require('../../config/aws');

exports.create = function(req , res){
  var post = new Posts(req.body);
  post.creator = req.user;

  post.save(function(err , post){
    if(err){
      var message = error.getErrorMessage2(err);
      return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: message });
    }else{
      res.json(post);
    }
  });
};

exports.uploadImage = function(req , res){
  var post = req.post;

  if(req.file){
    Posts.findOneAndUpdate({_id: post._id} , { $set: {image: req.file.filename , aws: 'https://s3.amazonaws.com/mahmoudadel/'+req.file.filename} } , { new: true , runValidators: true } , function(err , profile){
  		if(err) return res.status(400).send({ status: 'Failed' , statusCode: 400 , message: error.getErrorMessage(err) });
      AWS.onFileUploadData(req.file.filename , req.file.path , req.file.mimetype);
  		res.json({status: 'Success' , statusCode: 200 , image: profile.image , aws: profile.aws});
  	});
	}else{
    res.status(400).send({ status: 'Failed' , statusCode: 400 , message: 'No image selected' });
  }
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
	var post = req.post,
			image = req.post.image,
			aws = req.post.aws;

	post.remove(function(err , post){
		if(err){
      var message = error.getErrorMessage2(err);
      return res.status(400).send({ status: 'Failed' , message: message });
		}else{
      if(image) del.sync('public/uploads/'+ image);
			if(aws) AWS.onFileDelete('mahmoudadel' , image);
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
