const mongoose = require("mongoose");

/**
 * Mock Tables data
 */
const tableOne = {
	_id: new mongoose.Types.ObjectId(),
	type: "small",
	capacity: "1-6",
	status: "empty",
};
const tableTwo = {
	_id: new mongoose.Types.ObjectId(),
	type: "medium",
	capacity: "7-9",
	status: "empty",
};


/**
 * Mock Staff data
 */
const staffOne = {
	_id: new mongoose.Types.ObjectId(),
	first_name: "Amanda",
	last_name: "Jarvis",
	tables: [tableOne._id],
};
const staffTwo = {
	_id: new mongoose.Types.ObjectId(),
	first_name: "Jack",
	last_name: "Butler",
	tables: [tableTwo._id],
};


/**
 * Mock Customers data
 */
const customerOneId = new mongoose.Types.ObjectId();
const customerOne = {
	_id: customerOneId,
	first_name: "John",
	last_name: "Doe",
	phone: "0802603243452",
	size: 6,
	staff: staffOne,
	table: tableOne,
};
const customerTwoId = new mongoose.Types.ObjectId();
const customerTwo = {
	_id: customerTwoId,
	first_name: "Jane",
	last_name: "Doe",
	phone: "080951323734",
	size: 6,
	staff: staffOne,
	table: tableOne,
};
const customerThreeId = new mongoose.Types.ObjectId();
const customerThree = {
	_id: customerThreeId,
	first_name: "Joke",
	last_name: "Silva",
	phone: "080921323433",
	size: 6,
	staff: staffOne,
	table: tableOne,
};
const customerFourId = new mongoose.Types.ObjectId();
const customerFour = {
	_id: customerThreeId,
	first_name: "Jojo",
	last_name: "Shelvy",
	phone: "080921111290",
	size: 6,
	staff: staffOne,
	table: tableOne,
};

/**
 * Mock Reservations data
 */
const reservationOneId = new mongoose.Types.ObjectId();
const reservationOne = {
  _id: reservationOneId,
	customer: customerOneId,
	staff: staffOne,
	table: tableOne,
	size: customerOne.size,
};

const reservationTwoId = new mongoose.Types.ObjectId();
const reservationTwo = {
  _id: reservationTwoId,
	customer: customerTwoId,
	staff: staffOne,
	table: tableOne,
	size: customerTwo.size,
};
const reservationThreeId = new mongoose.Types.ObjectId();
const reservationThree = {
  _id: reservationThreeId,
	customer: customerThreeId,
	staff: staffOne,
	table: tableOne,
	size: customerThree.size,
};
const reservationFourId = new mongoose.Types.ObjectId();
const reservationFour = {
	_id: reservationFourId,
	customer: customerFourId,
	staff: staffOne,
	table: tableOne,
	size: customerFour.size,
};

/**
 * Mock Reservations data
 */
const waitlistId = new mongoose.Types.ObjectId();
const waitlistOne = {
	_id: waitlistId,
	table: tableOne,
  reservation: [
    { id: reservationTwoId, priority: 1 },
    { id: reservationThreeId, priority: 2 },
    { id: reservationFourId, priority: 3 },
  ],
};



module.exports = {
	customerOne,
	customerTwo,
  customerThree,
  customerFour,
	tableOne,
	tableTwo,
	staffOne,
	staffTwo,
	reservationOne,
	reservationTwo,
	reservationThree,
	reservationFour,
	waitlistOne,
};
