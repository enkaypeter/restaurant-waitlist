const randomNumberGenerator = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const reprioritise = (waitlistResponse, customer_id) => {
  const { reservation } = waitlistResponse;

  for (let i = 0; i < reservation.length; i++) {
    if (customer_id == reservation[i].id) {
      let incoming =  i;
      let current = reservation[i - 1].priority;
      swap(reservation, current, incoming);
    }
  }

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

  // join old list with new list with current customer on top
  newReservation = newReservation.concat(reservation);
  return newReservation;

}

//WIP
const swap = (arr, current, incoming) => {
  let temp = current;
}


module.exports = {
	randomNumberGenerator,
	reprioritise,
	promoteCustomer,
};