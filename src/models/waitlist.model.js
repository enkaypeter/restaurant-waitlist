const mongoose = require("mongoose");

const SCHEMA = new mongoose.Schema(
	{
		table: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tables",
		},

		reservation: {
			type: Array,
			required: true
		}
	},
	{ timestamps: true }
);


module.exports = mongoose.model("Waitlist", SCHEMA);