const { Customers, Reservations, Waitlist, Tables } = require("../models");

const { prioritise } = require("../helpers/max_heap.queue");

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

    
    if (waitlist.length > 0) {
      let lastCustomerPriority =
      waitlist[0].reservation[waitlist[0].reservation.length - 1].priority;
      let incomingCustomerPriority = lastCustomerPriority += 1;
  
      let newWaitlistPayload = {
				id: reservationObj.id,
				priority: incomingCustomerPriority,
			};
  
      waitlist[0].reservation.push(newWaitlistPayload);

      let updatePayload = {
				column: "reservation",
				data: waitlist[0].reservation,
      };


      return await updateWaitlistById(waitlist[0]._id, updatePayload);
    }
    

		const waitlistPayload = {
			table: reservationObj.table,
      reservation: [{ id: reservationObj.id, priority: 1 }],
		};

    const newWaitlist = new Waitlist(waitlistPayload);
    const waitlistResponse = await newWaitlist.save().catch(err => {
      console.log(err);
      return err;
    });

    return waitlistResponse;
	}

}

const getWaitlist = async (tableRef) => {
  return await Waitlist.find({ table: tableRef }).exec().catch(err => {
    console.log(err);
    return err;
  })

}

const getWaitlistById = async (filter) => {
  return await Waitlist.find(filter).exec().catch(err => {
    console.log(err);
    return err;
  })
}

const getAllTables = async () => {
  return await Tables.find({}).exec().catch(err => {
    console.log(err);
    return err;
  })
};



const findTableById = async (tableId) => {
  return await Tables.findById(tableId).exec().catch(err => {
    console.log(err);
    return err;
  });
}

const updateTableStatus = async (id, status) => {
  const filter = { _id: id };
  const update = { status: status };
  return await Tables.findOneAndUpdate(filter, update, { new: true }).catch(err => {
    console.log(err);
    return err;
  })
}

const updateWaitlistById = async (id, payload) => {
  const filter = { _id: id };
  const { column, data } = payload;
  const update = { [column]: data };

  return await Waitlist.findOneAndUpdate(filter, update, { new: true }).catch(err => {
    console.log(err);
    return err;
  })
}

const getReservationsById = async (id, columnName) => {
  let reservationResponse = await Reservations.find({ [columnName]: id }).exec().catch(err => {
    console.log(err);
    return err;
  });

  const [reservation] = reservationResponse;
  return reservation;
}

const getAllFromWaitlist = async () => {
  return await Waitlist.find({}).exec().catch(err => {
    console.log(err);
    return err;
  })
}

const getCustomerById = async (id, columnName) => {
  let getCustomerResponse = await Customers.find({ [columnName]: id }).exec().catch(err => {
    console.log(err);
    return err;
  });

  const [customerResponse] = getCustomerResponse;
  console.log(customerResponse);
  return customerResponse;
}

const updateReservationById = async (id, payload) => {
	const filter = { _id: id };
	const { column, data } = payload;
	const update = { [column]: data };

	return await Reservations.findOneAndUpdate(filter, update, {
		new: true,
	}).catch((err) => {
		console.log(err);
		return err;
	});
};

module.exports = {
	makeCustomerReservation,
	addCustomerToWaitlist,
	getWaitlist,
	getWaitlistById,
	getAllTables,
	updateTableStatus,
	findTableById,
	getReservationsById,
	updateWaitlistById,
	getAllFromWaitlist,
	getCustomerById,
	updateReservationById,
};