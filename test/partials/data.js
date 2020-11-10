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

module.exports = {
	customerOne,
	customerTwo,
	customerThree,
  tableOne,
  tableTwo,
  staffOne,
  staffTwo,
  reservationOne,
  reservationTwo,
  reservationThree
};
