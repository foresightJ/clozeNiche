const mongoose = require("mongoose")
const { Schema } = mongoose

const improvementsSchema = new Schema({
		reason : {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    deadline: {
      type: String,
      required: true
    },
    comments: [{
      comment: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
      }
    }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Improvements", improvementsSchema)