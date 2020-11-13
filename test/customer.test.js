const DB = require("./partials/db");
const { Tables, Staff, Customers, Reservations } = require("../src/models");
const {
	makeCustomerReservation,
	addCustomerToWaitlist,
	updateWaitlistById,
} = require("../src/db/repository.db");
const {
	customerOne,
	staffOne,
	tableOne,
	waitlistOne,
	reservationOne,
} = require("./partials/data");

const {
	promoteCustomer,
	demoteCustomer,
	delayCustomer,
	bumpCustomer
} = require("../src/helpers/utility");


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await DB.connect()

});

/**
 * Clear all test data after every test.
 */
afterEach(async () => await DB.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await DB.closeDatabase());

describe("Customer Test", () => {
	test("Save customer, create a reservation, promote, demote and delay customer", async () => {
		/*
		 * Seed Staff, Tables and Customers
		 */
		let newStaff = new Staff(staffOne);
		let newTable = new Tables(tableOne);
		let newCustomer = new Customers(customerOne);
		let staff = await newStaff.save();
		let table = await newTable.save();
		let customer = await newCustomer.save();

		/**
		 * Should be able to create a customer
		 */
		expect(staff).not.toBeNull();
		expect(table).not.toBeNull();
		expect(customer).not.toBeNull();

		/**
		 * Should be able to add to wailist add make reservation
		 */
		const reservationPayload = {
			customer: customerOne._id,
			staff: staffOne._id,
			table: tableOne._id,
			size: customerOne.size,
		};
		expect(async () => {
			let reservationResponse = await makeCustomerReservation(
				reservationPayload
			);
			await addCustomerToWaitlist(reservationResponse);
		}).not.toThrow();

		/**
		 * Should be able to get wailist and promote a customer
		 */
		expect(async () => {
			let promotedCustomer = promoteCustomer(
				[waitlistOne],
				waitlistOne.reservation[1].id
			); //Get second customer on the list for promotion
			let payload = {
				column: "reservation",
				data: promotedCustomer,
			};
			return await updateWaitlistById(waitlistOne._id, payload);
    }).not.toThrow();
    
		/**
		 * Should be able to demote a customer
		 */
    expect(async () => {
      let demotedCustomer = demoteCustomer(
				[waitlistOne],
				waitlistOne.reservation[0].id //Demote first customer on the list
			);
      let payload = {
        column: "reservation",
        data: demotedCustomer,
      };

      return await updateWaitlistById(waitlistOne._id, payload);
    }).not.toThrow();
    
    /**
     * Should  be able to delay a customer
     */
    expect(async () => {
      let delayedCustomer = delayCustomer(
				[waitlistOne],
				waitlistOne.reservation[0].id
			);

      let payload = {
        column: "reservation",
        data: delayedCustomer,
      };

      return await updateWaitlistById(
				waitlistOne._id,
				payload
			);
    }).not.toThrow();

    /**
     * Should  be able to bump a customer
     */
    expect(async () => {
      let bumpedCustomer = bumpCustomer(
				[waitlistOne],
				waitlistOne.reservation[0].id
			);

      let payload = {
				column: "reservation",
				data: bumpedCustomer,
			};

      return await updateWaitlistById(
				waitlistOne._id,
				payload
			);
    }).not.toThrow();

	});
});
