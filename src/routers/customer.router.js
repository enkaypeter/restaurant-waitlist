const express = require("express");
const router = express();
const customersController = require("../controllers/customer.controller");


router.post("/add", customersController.add);


module.exports = router;
