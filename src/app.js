const express = require("express");
require("./db/mongoose");
const morgan = require("morgan");
const customerRouter = require("./routers/customer.router");

const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hey there 👋🏾",
  });
})

app.use("/customer", customerRouter);

module.exports = app;
