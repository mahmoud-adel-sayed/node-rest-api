var AWS = require('aws-sdk');
	fs = require('fs');

var accessKeyId =  process.env.AWS_ACCESS_KEY,
	secretAccessKey = process.env.AWS_SECRET_KEY;

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var s3 = new AWS.S3();

exports.onFileUploadData = function (filename, path , type){
	fs.readFile(path, function(err, data){
		if (err){
			console.log(err);
		}
		var params = {
			Bucket: 'mahmoudadel',
			Key: filename,
			Body: data,
			ContentType: type,
			ACL: 'public-read'
		};
		s3.putObject(params, function (err, success){
			if(err){
			    console.log("Error uploading data: ", err);
			}else{
			    console.log("Successfully uploaded data to Bucket/Key");
			}
		});
	});
};

exports.onFileDelete = function(bucket , filename){
	var params = {
		Bucket: bucket,
		Key: filename
	}
	s3.deleteObject(params , function(err , data){
		if(err) console.log(err);
		else console.log(data)
	});
};
