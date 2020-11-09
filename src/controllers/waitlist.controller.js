const {
	getAllFromWaitlist,
	getWaitlistById,
	findTableById,
	getReservationsById,
	getCustomerById,
} = require("../db/repository.db");

module.exports = {
	view: async (req, res) => {
		let response = {
			success: false,
			statusCode: 400,
			error: "",
		};

		try {
			const allWaitlist = await getAllFromWaitlist();
			response.message = "Waitlist Fetch Successful";
			response.data = allWaitlist;
			response.success = true;
			response.statusCode = 200;
			response.error == "" ? delete response.error : response.error;
		} catch (error) {
			response.error = error;
			console.log(error);
		}

		return res.status(response.statusCode).json(response);
	},

  viewById: async (req, res) => {
		let response = {
			success: false,
			statusCode: 400,
			error: "",
		};

    const { waitlist_id } = req.params;
    
    try {
      let [waitlistResponse] = await getWaitlistById({ _id: waitlist_id });
      
      for (let i = 0; i < waitlistResponse.reservation.length; i++){
        waitlistResponse.reservation[i].id =
          await getReservationsById(waitlistResponse.reservation[i].id, "_id");
        let fetchCustomerById = await getCustomerById(
          waitlistResponse.reservation[i].id.customer,
          "_id"
        );
        fetchCustomerById !== undefined
          ? (waitlistResponse.reservation[i].id.customer = fetchCustomerById)
          : waitlistResponse.reservation[i].id.customer;
      }

      waitlistResponse.table = await findTableById(waitlistResponse.table);
      response.message = "Waitlist Fetch Successful";
      response.data = waitlistResponse;
      response.success = true;
      response.statusCode = 200;
      response.error == "" ? delete response.error : response.error;      
    } catch (error) {
      response.error = error;
      console.log(error);
    }

		return res.status(response.statusCode).json(response);
	}
};