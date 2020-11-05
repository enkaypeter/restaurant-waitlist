const { Customers, Reservations, Waitlist } = require("../models");
const makeCustomerReservation = async (payload) => {
  payload.arrival_time = Date.now();
  payload.complete_time = "";
  payload.isCancelled = 0

  const newReservation = new Reservations(payload);

  let reservationResponse = await newReservation.save().catch(err => {
    console.log(err);
    return err;
  });

  return reservationResponse;

}

const addCustomerToWaitlist = async (reservationObj) => {

  if (reservationObj !== undefined) {
    const waitlist = await getWaitlist(reservationObj.table).catch(err => {
      console.log(err);
      return err;
    });

		if (waitlist !== []) {
			//await updateWaitlist(waitlist, reservationObj);
		}

		const waitlistPayload = {
			table: reservationObj.table,
			reservation: [reservationObj.id],
		};

    const newWaitlist = new Waitlist(waitlistPayload);
    const waitlistResponse = await newWaitlist.save().catch(err => {
      console.log(err);
      return err;
    });

    return waitlistResponse
	}

}

const getWaitlist = async (tableRef) => {
  return await Waitlist.find({ table: tableRef }).exec().catch(err => {
    console.log(err);
    return err;
  })

}

const updateWaitlist = async (waitlistObj, reservationObj) => {
  // WIP
}

module.exports = {
	makeCustomerReservation,
  addCustomerToWaitlist,
  getWaitlist
};