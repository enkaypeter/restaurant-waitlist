const express = require("express");
const router = express();
const customersController = require("../controllers/customer.controller");


router.post("/add", customersController.add);
router.post("/promote/:customer_id", customersController.promote);
router.post("/bump/:customer_id", customersController.bump);
router.post("/delay/:customer_id", customersController.delay);



module.exports = router;
