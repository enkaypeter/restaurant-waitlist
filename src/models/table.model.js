const mongoose = require("mongoose");

const SCHEMA = new mongoose.Schema(
	{
		type: {
			type: String,
			trim: true,
			required: true,
		},

		capacity: {
			type: String,
			required: true,
		},

		status: {
			type: "String",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Tables", SCHEMA);