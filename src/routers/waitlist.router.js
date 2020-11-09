const express = require("express");
const router = express();
const waitlistController = require("../controllers/waitlist.controller");

router.get("/view", waitlistController.view);
router.get("/view/:waitlist_id", waitlistController.viewById);
router.post("/cancel/:waitlist_id/:reservation_id", waitlistController.cancelById);

module.exports = router;
