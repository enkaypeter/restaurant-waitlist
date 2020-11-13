const DB = require("./partials/db");
const { getAllFromWaitlist } = require("../src/db/repository.db");
const { Waitlist, Reservations, Tables } = require("../src/models");


const {
	getWaitlistById,
	getReservationsById,
	getCustomerById,
	findTableById,
	updateTableStatus,
} = require("../src/db/repository.db");

const {
	waitlistOne,
	reservationTwo,
	reservationThree,
	reservationFour,
	reservationFive,
	tableOne,
	tableTwo
} = require("./partials/data");

const {
	removeReservation,
} = require("../src/helpers/utility");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await DB.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await DB.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await DB.closeDatabase());

describe("Waitlist Test", () => {
	it("Should have a length of 0 nothing if nothing is found", async () => {
		await expect(
			getAllFromWaitlist()
		).resolves.toHaveLength(0);
  });
  
  it("Can fetch waitlist with no error", async () => {
		expect(
			async () => await getAllFromWaitlist()
		).not.toThrow();
  });

  it("Can fetch waitlist by Id with not errors", async () => {
    expect(async () => {
      await getWaitlistById({ _id: waitlistOne._id });
    })
  });

  it("Can remove reservation by Id in wailist", async () => {
    let removeReservationResponse = removeReservation(
			waitlistOne,
			waitlistOne.reservation[0].id
		);
    expect(removeReservationResponse).toBeDefined();  
	})
	

	it("Can view a reservation by Id", async () => {

		let newReservationTwo = new Reservations(reservationTwo);
		let newReservationThree = new Reservations(reservationThree);
		let newReservationFour = new Reservations(reservationFour);
		let newReservationFive = new Reservations(reservationFive);
		
		await newReservationTwo.save();
		await newReservationThree.save();
		await newReservationFour.save();
		await newReservationFive.save();
		
		let newWaitlist = new Waitlist(waitlistOne);
		let waitlistData = await newWaitlist.save();


		let [waitlistResponse] = await getWaitlistById({ _id: waitlistData._id });


		for (let i = 0; i < waitlistResponse.reservation.length; i++) {
			waitlistResponse.reservation[i]._id = await getReservationsById(
				waitlistResponse.reservation[i].id,
				"_id"
			);
			let fetchCustomerById = await getCustomerById(
				waitlistResponse.reservation[i]._id.customer,
				"_id"
			);
			fetchCustomerById !== undefined
				? (waitlistResponse.reservation[
					i
				]._id.customer = fetchCustomerById)
				: waitlistResponse.reservation[i]._id.customer;
		}

		waitlistResponse.table = await findTableById(waitlistResponse.table);
		expect(waitlistResponse.table).toBeDefined();

	});

	it("Can update table status", async () => {
		const newTable = new Tables(tableOne);
		const table = await newTable.save();
		await expect( async () => updateTableStatus(table, "occupied")).not.toThrow();
	})

	it("Can find table by Id", async () => {
		const newTable = new Tables(tableTwo);
		const table = await newTable.save();
		await expect(async () => findTableById(table._id)).not.toThrow();
	})
  
});
