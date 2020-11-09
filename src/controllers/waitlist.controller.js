const {
	getAllFromWaitlist,
	getWaitlistById,
	findTableById,
	getReservationsById,
	getCustomerById,
	updateTableStatus,
	updateReservationById,
	updateWaitlistById,
} = require("../db/repository.db");

const { removeReservation } = require("../helpers/utility");

module.exports = {
	view: async (req, res) => {
		let response = {
			success: false,
			statusCode: 400,
			error: "",
		};

		try {
			const allWaitlist = await getAllFromWaitlist();
			response.message = "Waitlist fetch successful";
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
      response.message = "Waitlist fetch successful";
      response.data = waitlistResponse;
      response.success = true;
      response.statusCode = 200;
      response.error == "" ? delete response.error : response.error;      
    } catch (error) {
      response.error = error;
      console.log(error);
    }

		return res.status(response.statusCode).json(response);
  },
  
  cancelById: async (req, res) => {
    let response = {
      success: false,
      statusCode: 400,
      error: "",
    };

    const { waitlist_id, reservation_id } = req.params;

    let [waitlistResponse] = await getWaitlistById({ _id: waitlist_id });

    if (waitlistResponse == undefined) {
      response.error = "Waitlist doesn't exist";
		  return res.status(response.statusCode).json(response);
    }

    let findReservationResponse = waitlistResponse.reservation.find(rsvp => rsvp.id == reservation_id);

    if (findReservationResponse == undefined) {
      response.error = "Reservation doesn't exist in sepecified waitlist";
      return res.status(response.statusCode).json(response);
    }

    let removeReservationResponse = removeReservation(waitlistResponse, reservation_id);
    if (removeReservationResponse.length == 0) {
      await updateTableStatus(table, "empty");
    }

    try {
      let reservationPayload = {
        column: "isCancelled",
        data: true
      };

      await updateReservationById(findReservationResponse.id, reservationPayload);
  
      let waitlistPayload = {
        column: "reservation",
        data: removeReservationResponse,
      };
  
      let updateWaitlistResponse = await updateWaitlistById(
				waitlistResponse.id,
				waitlistPayload
			);

      response.message = "Reservation cancelled successfully";
      response.data = updateWaitlistResponse;
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