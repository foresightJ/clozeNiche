const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
	{
		username: String,
		about: String,
		avatar: String,
		email: String,
		googleId: String,
		contact:[{
			linkedIn:{type: Schema.Types.String},
			gitHub:{type: Schema.Types.String},
			plum:{type: Schema.Types.String}
		}],
		strengths: [],
		interests: [],
		improvements: [{
			toImprove: {
				type: Schema.Types.ObjectId,
				ref: "Improvements"
			}
		}],
	},

	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
