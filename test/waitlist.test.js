const DB = require("./partials/db");
const { getAllFromWaitlist } = require("../src/db/repository.db");

const {
	getWaitlistById,
} = require("../src/db/repository.db");

const {
	waitlistOne,
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
  
});
