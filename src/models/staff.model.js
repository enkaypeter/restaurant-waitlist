const mongoose = require("mongoose");

const SCHEMA = new mongoose.Schema(
	{
		first_name: {
			type: String,
			trim: true,
			required: true,
		},

		last_name: {
			type: String,
			default: false,
		},

		tables: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tables",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Staff", SCHEMA);