const DB = require("./partials/db");

const { waitlistOne } = require("./partials/data");

const {
	promoteCustomer,
	bumpCustomer,
	delayCustomer,
	demoteCustomer,
	removeReservation,
} = require("../src/helpers/utility");

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

describe("Waitlist Test", () => {
	it("Should promote a customer succefully to the top of the list", () => {
		let reservationId = waitlistOne.reservation[2].id;
		expect(promoteCustomer([waitlistOne], reservationId)[0]).toEqual({
			id: reservationId,
			priority: 1,
		});
	});

	it("Should bump a customer successfully one spot up the list", () => {
		let reservationId = waitlistOne.reservation[2].id;
		let previousPriority = waitlistOne.reservation[2].priority;

		// A bumped customer should be the n-1th index in the reservation array
		expect(bumpCustomer([waitlistOne], reservationId)[1]).toEqual({
			id: reservationId,
			priority: previousPriority - 1,
		});
	});

	it("Should delay a customer successfully one spot down the list", () => {
		let reservationId = waitlistOne.reservation[1].id;
		let previousPriority = waitlistOne.reservation[1].priority;

		// A delayed customer should be the n+1th index in the reservation array
		expect(delayCustomer([waitlistOne], reservationId)[2]).toEqual({
			id: reservationId,
			priority: previousPriority + 1,
		});
	});

	it("Should demote a customer successfully to bottom of list", () => {
		// A delayed customer should be the n+1th index in the reservation array
		let reservationId = waitlistOne.reservation[0].id;
		expect(
			demoteCustomer([waitlistOne], reservationId)[
				waitlistOne.reservation.length - 1
			].priority
		).not.toBeNull();
	});

	it("Should remove a reservation from waitlist", () => {
		// A removed reservation should not be found in waitlist
		let reservationId = waitlistOne.reservation[0].id;
		let currentPriority = waitlistOne.reservation[0].priority;
		expect(removeReservation(waitlistOne, reservationId)).not.toContain({
			id: reservationId,
			priority: currentPriority,
		});
  });
});
