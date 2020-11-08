const express = require("express");
const router = express();
const waitlistController = require("../controllers/waitlist.controller");

router.get("/view", waitlistController.view);

module.exports = router;
