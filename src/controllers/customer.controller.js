const { Customers, Tables, Staff } = require("../models");
const {
	makeCustomerReservation,
	addCustomerToWaitlist,
	getWaitlist,
	getAllTables,
	updateTableStatus,
	findTableById,
} = require("../db/repository.db");
const { randomNumberGenerator } = require("../helpers/utility");
module.exports = {
	add: async (req, res) => {
		let response = {
			success: false,
			statusCode: 400,
			error: "",
		};
		const { first_name, last_name, phone, size, table } = req.body;
		const bioData = { first_name, last_name, phone };

		// const tablesReference = [
		// 	"5fa2b5d1e60e4a9bc7fd89dd",
		// 	"5fa2b6360c202c9c5b64f52c",
		// 	"5fa2bc51723585a408134067",
		// ];


		const staffReference = [
			"5fa2c2a1f12dfaacb0023a2c",
			"5fa2c34de5cd1bad71f1555a",
		];



		
		const newCustomer = new Customers(bioData);

		const saveResponse = await newCustomer.save().catch((err) => {
			response.statusCode = 400;
			response.error = err;
			console.log(err);
		});

		if (saveResponse !== undefined) {
			const reservationPayload = {
				customer: saveResponse.id,
        staff: "5fa2c2a1f12dfaacb0023a2c",
				table, 
        size
      };
      
      try {
				let reservationResponse = await makeCustomerReservation(reservationPayload);
				let tableResponse = await findTableById(table);
				if (tableResponse.status !== "empty") {
					await addCustomerToWaitlist(reservationResponse);
				}
				
				await updateTableStatus(table, "occupied");

        response.data = saveResponse;
        response.success = true;
        response.message = "Reservation Successfull";
        response.statusCode = 200;
        response.error == "" ? delete response.error : response.error;        
      } catch (error) {
        response.statusCode = 400;
        response.error = error;
      }

		}

		return res.status(response.statusCode).json(response);
	},
};
