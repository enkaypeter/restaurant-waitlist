const mongoose = require("mongoose");

const SCHEMA = new mongoose.Schema(
	{
		table: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tables",
		},

		reservation: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Reservations",
			},
		],
	},
	{ timestamps: true }
);


module.exports = mongoose.model("Waitlist", SCHEMA);