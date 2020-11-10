const DB = require("./partials/db");
const mongoose = require("mongoose");
const { Waitlist, Tables, Staff } = require("../src/models");
const {
	getWaitlistById,
	makeCustomerReservation,
} = require("../src/db/repository.db");
const {
  customerOne,
  customerTwo,
  customerThree,
  staffOne,
  tableOne,
  tableTwo,
  tableThree,
} = require("./partials/data");


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
  test("Save customer and create a reservation", async () => {
    let newStaff = new Staff(staffOne);
    let newTable = new Tables(tableOne);

    let staff = await newStaff.save();
    let table = await newTable.save();

    expect(staff).not.toBeNull();
    expect(table).not.toBeNull();

    makeCustomerReservation



	});
});
