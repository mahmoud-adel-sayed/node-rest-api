exports.getErrorMessage = function(err){
	var message = '';
	if(err.code){
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
			break;
			default:
				message = 'Something went wrong';
		}
	}else{
		for(var errName in err.errors){
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

exports.getErrorMessage2 = function(err){
	if(err.errors){
		for(var errorName in err.errors){
			if(err.errors[errorName].message) return err.errors[errorName].message;
		}
	}else{
		return 'Unknown Server Error';
	}
};
