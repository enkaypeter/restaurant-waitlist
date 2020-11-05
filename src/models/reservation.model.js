const mongoose = require("mongoose");

const SCHEMA = new mongoose.Schema(
	{
		table: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tables",
			required: true,
		},

		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Customers",
			required: true,
		},
		
		staff: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Staff",
			required: true,
		},

		complete_time: {
			type: Date,
			default: Date.now(),
		},

		arrival_time: {
			type: Date,
			default: Date.now(),
			required: true
		},

		isCancelled: {
			type: Boolean,
			default: 0
		},

		size: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);



const Reservations = mongoose.model("Reservations", SCHEMA);

module.exports = Reservations;