const mongoose = require("mongoose");

const SCHEMA = mongoose.Schema(
	{
		first_name: {
			type: String,
			trim: true,
			required: true,
		},

		last_name: {
			type: String,
			trim: true,
			required: true,
		},

		phone: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Customers", SCHEMA);
