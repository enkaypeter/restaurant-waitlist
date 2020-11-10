const DB = require("./partials/db");
const mongoose = require("mongoose");
const request = require("supertest");

const { Waitlist } = require("../src/models");
const { getAllFromWaitlist } = require("../src/db/repository.db");

// const app = require("../src/app");

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

describe("Waitlist Model Test", () => {
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
});
