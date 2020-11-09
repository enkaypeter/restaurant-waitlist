const { Customers, Tables, Staff } = require("../models");
const {
	makeCustomerReservation,
	addCustomerToWaitlist,
	getWaitlist,
	getAllTables,
	updateTableStatus,
	findTableById,
	getReservationsById,
	updateWaitlistById,
} = require("../db/repository.db");
const {
	randomNumberGenerator,
	promoteCustomer,
	bumpCustomer,
	delayCustomer,
	demoteCustomer,
} = require("../helpers/utility");
module.exports = {
	add: async (req, res) => {
		let response = {
			success: false,
			statusCode: 400,
			error: "",
		};
		const { first_name, last_name, phone, size, table } = req.body;
		const bioData = { first_name, last_name, phone };
		
		const newCustomer = new Customers(bioData);

		const saveResponse = await newCustomer.save().catch((err) => {
			response.error = err;
			console.log(err);
		});

		if (saveResponse !== undefined) {
			const reservationPayload = {
				customer: saveResponse.id,
				staff: "5fa2c2a1f12dfaacb0023a2c",
				table,
				size,
			};

			try {
				let reservationResponse = await makeCustomerReservation(
					reservationPayload
				);
				let tableResponse = await findTableById(table);

				if (tableResponse.status !== "empty") {
					await addCustomerToWaitlist(reservationResponse);
				}

				await updateTableStatus(table, "occupied");

				response.message = "Reservation Successful";
				response.data = saveResponse;
				response.success = true;
				response.statusCode = 200;
				response.error == "" ? delete response.error : response.error;
			} catch (error) {
				response.error = error;
			}
		}

		return res.status(response.statusCode).json(response);
	},

	promote: async (req, res) => {
		let response = {
			success: false,
			statusCode: 400,
			error: "",
		};

		const { customer_id } = req.params;
		try {
			let reservationResponse = await getReservationsById(
				customer_id,
				"customer"
			);
			let waitlistResponse = await getWaitlist(reservationResponse.table);
			let promotedCustomer = promoteCustomer(
				waitlistResponse,
				reservationResponse._id
			);
			let payload = {
				column: "reservation",
				data: promotedCustomer,
			};

			let updateWaitlistResponse = await updateWaitlistById(
				waitlistResponse[0].id,
				payload
			);
			response.message = "Customer Promoted Successfully";
			response.data = updateWaitlistResponse;
			response.success = true;
			response.statusCode = 200;
			response.error == "" ? delete response.error : response.error;
		} catch (error) {
			response.error = error;
		}

		return res.status(response.statusCode).json(response);
	},

	bump: async (req, res) => {
		let response = {
			success: false,
			statusCode: 400,
			error: "",
		};

		const { customer_id } = req.params;
		try {
			let reservationResponse = await getReservationsById(
				customer_id,
				"customer"
			);
			let waitlistResponse = await getWaitlist(reservationResponse.table);
			let promotedCustomer = bumpCustomer(
				waitlistResponse,
				reservationResponse._id
			);
			let payload = {
				column: "reservation",
				data: promotedCustomer,
			};

			let updateWaitlistResponse = await updateWaitlistById(
				waitlistResponse[0].id,
				payload
			);
			response.message = "Customer Bumped Successfully";
			response.data = updateWaitlistResponse;
			response.success = true;
			response.statusCode = 200;
			response.error == "" ? delete response.error : response.error;
		} catch (error) {
			response.error = error;
		}

		return res.status(response.statusCode).json(response);
	},

	delay: async (req, res) => {
		let response = {
			success: false,
			statusCode: 400,
			error: "",
		};

		const { customer_id } = req.params;
		try {
			let reservationResponse = await getReservationsById(
				customer_id,
				"customer"
			);
	
			let waitlistResponse = await getWaitlist(reservationResponse.table);
	
			let delayedCustomer = delayCustomer(
				waitlistResponse,
				reservationResponse._id
			);
	
			let payload = {
				column: "reservation",
				data: delayedCustomer,
			};
	
			let updateWaitlistResponse = await updateWaitlistById(
				waitlistResponse[0].id,
				payload
			);
			response.message = "Customer Bumped Successfully";
			response.data = updateWaitlistResponse;
			response.success = true;
			response.statusCode = 200;
			response.error == "" ? delete response.error : response.error;			
		} catch (error) {
			response.error = error;	
		}


		return res.status(response.statusCode).json(response);
	},

	demote: async (req, res) => {
		let response = {
			success: false,
			statusCode: 400,
			error: "",
		};

		const { customer_id } = req.params;
		try {
			let reservationResponse = await getReservationsById(
				customer_id,
				"customer"
			);
	
			let waitlistResponse = await getWaitlist(reservationResponse.table);
	
			let demotedCustomer = demoteCustomer(
				waitlistResponse,
				reservationResponse._id
			);
			let payload = {
				column: "reservation",
				data: demotedCustomer,
			};

			let updateWaitlistResponse = await updateWaitlistById(
				waitlistResponse[0].id,
				payload
			);
			response.message = "Customer Bumped Successfully";
			response.data = updateWaitlistResponse;
			response.success = true;
			response.statusCode = 200;
			response.error == "" ? delete response.error : response.error;			
		} catch (error) {
			response.error = error;	
		}
		
		return res.status(response.statusCode).json(response);
	},


};
