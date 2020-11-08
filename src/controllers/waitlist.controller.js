const { getAllFromWaitlist } = require("../db/repository.db");

module.exports = {
  view: async (req, res) => {
    let response = {
      success: false,
      statusCode: 400,
      error: "",
    };

    try {      
      const allWaitlist = await getAllFromWaitlist();
      response.data = allWaitlist;
      response.success = true;
      response.message = "Waitlist Fetch Successfull";
      response.statusCode = 200;
      response.error == "" ? delete response.error : response.error;
    } catch (error) {
      response.error = error;
      console.log(error);
    }

		return res.status(response.statusCode).json(response);
  }
}