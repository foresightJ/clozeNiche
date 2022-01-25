const mongoose = require('mongoose');
// shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

var helpMeImproveSchema = new mongoose.Schema(
	{
		text: [String],
		reason: String,
		improveBy: Date,
	},
	{
		timestamps: true,
	}
);

var userSchema = new Schema(
	{
		username: String,
		about: String,
		avatar: String,
		googleId: String,
		contact: [String],
		strengths: [String],
		interests: [String],
		helpMeImprove: [helpMeImproveSchema],
	},

	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
