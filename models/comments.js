const mongoose = require("mongoose")
const { Schema } = mongoose

const commentsSchema = new Schema({
		comment : {
      type: String,
      required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    improvementId: {
        type: Schema.Types.ObjectId,
        ref: 'Improvements',
        required: true
      }
   
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Comments", commentsSchema)