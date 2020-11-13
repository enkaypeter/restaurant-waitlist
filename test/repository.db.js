const DB = require("./partials/db");
const { Tables, Staff, Customers, Reservations, Waitlist } = require("../src/models");

const {
	staffOne,
  tableOne,
  customerOne,
	reservationOne,
  waitlistOne,
} = require("./partials/data");


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
	await DB.connect();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => await DB.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await DB.closeDatabase());


describe("DB Repository Test", () => {
	/**
	 * Staff should exist after being created.
	 */
	it("Staff exists after being created", async () => {
		let newStaff = new Staff(staffOne);
		const staff = await newStaff.save();

		const findResponse = await Staff.findOne();
		expect(findResponse.name).toBe(staff.name);
	});

	/**
	 * Tables should exist after being created.
	 */
	it("Table exists after being created", async () => {
		let newTable = new Tables(tableOne);
		const table = await newTable.save();

		const findResponse = await Tables.findOne();
		expect(findResponse.type).toBe(table.type);
	});

	/**
	 * Customer should exist after being created.
	 */
	it("Customer exists after being created", async () => {
		let newCustomer = new Customers(customerOne);
		const customer = await newCustomer.save();

		const findResponse = await Customers.findOne();
		expect(findResponse.first_name).toBe(customer.first_name);
	});

	/**
	 * Reservation should exist after being created.
	 */
	it("Reservation exists after being created", async () => {
		let newReservation = new Reservations(reservationOne);
		await newReservation.save();

		const findResponse = await Reservations.findOne();
		expect(findResponse).toBeDefined();
	});

	/**
	 * Waitlist should exist after being created.
	 */
	it("Waitlist exists after being created", async () => {
		let newWaitlist = new Waitlist(waitlistOne);
		await newWaitlist.save();

		const findResponse = await Reservations.findOne();
		expect(findResponse).toBeDefined();
	});
})