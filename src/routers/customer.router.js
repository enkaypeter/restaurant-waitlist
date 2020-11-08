const express = require("express");
const router = express();
const customersController = require("../controllers/customer.controller");


router.post("/add", customersController.add);
router.post("/promote/:customer_id", customersController.promote);


module.exports = router;
