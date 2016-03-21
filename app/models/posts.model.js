var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
	created:{
		type: Date,
		default: Date.now
	},
	title:{
		type: String,
		trim: true,
		required: 'Title is required'
	},
	content:{
		type: String,
		required: 'Content is required'
	},
	image:{
		type: String
	},
	aws:{
		type: String
	},
	creator:{
		type: Schema.ObjectId,
		ref: 'Users'
	}
});

mongoose.model('Posts' , PostSchema);
