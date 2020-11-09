const randomNumberGenerator = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const bumpCustomer = (waitlistResponse, reservation_id) => {
  const { reservation } = waitlistResponse[0];

  let indexOf;

  for (let i = 0; i < reservation.length; i++) {
    if (reservation[i].id == reservation_id) {
      indexOf = i;
    }
  }

  if (reservation[indexOf].priority == 1) {
    return reservation; // return reservations as it is if customer is already top of list
  }


  //swap priorities
  reservation[indexOf - 1].priority += 1;
  reservation[indexOf].priority -= 1;

  //swap postions
  let temp = reservation[indexOf - 1];
  reservation[indexOf - 1] = reservation[indexOf];
  reservation[indexOf] = temp;

  return reservation;
 
};


const promoteCustomer = (waitlistResponse, reservation_id) => {
  let { reservation } = waitlistResponse[0];
    
  let newReservation = [];
  
  let indexOf;


  for (let i = 0; i < reservation.length; i++){
    if (reservation[i].id == reservation_id) {
      indexOf = i;
    }
  }

  if (reservation[indexOf].priority == 1) {
    return reservation; // return reservations as it is if customer is already top of list
  }

  //move current customer to a top of new
  reservation[indexOf].priority = 1;
  newReservation[0] = reservation[indexOf];

  // remove current customer from old list
  reservation.splice(indexOf, 1);

  // reset old list customer priorities
  reservation = reservation.map(customer => {
    customer.priority += 1;
    return customer;
  });

  // join old list and new list with current customer on top
  newReservation = newReservation.concat(reservation);
  return newReservation;

}

const delayCustomer = (waitlistResponse, reservation_id) => {
  let { reservation } = waitlistResponse[0];

  let indexOf;

  for (let i = 0; i < reservation.length; i++) {
    if (reservation[i].id == reservation_id) {
      indexOf = i;
    }
  }

  if (reservation.length == 1) {
    return reservation; // return reservations as it is if customer is already top of list
  }

  //swap priorities
  reservation[indexOf + 1].priority -= 1;
  reservation[indexOf].priority += 1;

  //swap postions
  let temp = reservation[indexOf + 1];
  reservation[indexOf + 1] = reservation[indexOf];
  reservation[indexOf] = temp;


  return reservation;

};

const demoteCustomer = (waitlistResponse, reservation_id) => {
  let { reservation } = waitlistResponse[0];
  
	let newReservation = [];

	let indexOf;

	for (let i = 0; i < reservation.length; i++) {
		if (reservation[i].id == reservation_id) {
			indexOf = i;
		}
	}

	if (reservation.length == 1) {
		return reservation; // return reservations as it is if customer is already top of list
	}

	//assign customer least priority
	reservation[indexOf].priority = reservation.length;
	newReservation[0] = reservation[indexOf];

	// remove current customer from position on the list
	reservation.splice(indexOf, 1);

	// reset customer priorities
	reservation = reservation.map((customer) => {
		customer.priority -= 1;
		return customer;
	});

	// join old list and new list with current customer at the rear
  newReservation = reservation.concat(newReservation);
	return newReservation;
};

const removeReservation = (waitlistResponse, reservation_id) => {
  let { reservation } = waitlistResponse;
  console.log("Before-->")
  console.log(reservation);

  let indexOf;

  for (let i = 0; i < reservation.length; i++) {
    if (reservation[i].id == reservation_id) {
      indexOf = i;
    }
  }

  // return reservation if item is the last on the list
  if (indexOf == (reservation.length - 1)) {
    reservation.splice(indexOf, 1); // if reservation is empty update table status to empty
    return reservation;
  }

  reservation.splice(indexOf, 1);

  if (reservation.length == 0) {
    return reservation;
  }

  for (let i = 0; i < reservation.length; i++){
    if (i + 1 !== reservation.length) {
			if (reservation[i].priority + 1 !== reservation[i + 1].priority) {
				reservation[i + 1].priority = reservation[i].priority + 1;
			}
    }
  }


  return reservation;

};

//WIP
const swap = (arr, current, incoming) => {
  let temp = current;
}


module.exports = {
	randomNumberGenerator,
	bumpCustomer,
	promoteCustomer,
	delayCustomer,
	demoteCustomer,
	removeReservation,
};