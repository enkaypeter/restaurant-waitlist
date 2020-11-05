require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(
    process.env.DB_CON_STRING,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully Connected to the database');
        }
    }
);