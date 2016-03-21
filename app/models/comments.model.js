var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	userId: {
		type: Schema.ObjectId,
		ref: 'Users'
	},
	postId: {
		type: Schema.ObjectId
	},
	content: {
		type: String,
		required: 'Content is required'
	}
});

mongoose.model('Comments' , CommentSchema);
