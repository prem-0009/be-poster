const {
  createUser,
  hashPassword,
  errorHandler,
  findOneUser,
  comparePassword,
  createJwtToken,
} = require("./authHelper");

module.exports = {
  register: async (req, res) => {
    console.log(req.body);

    try {
      let newUser = await createUser(req.body);
      let hashedPassword = await hashPassword(newUser.password);
      newUser.password = hashedPassword;
      let savedUser = await newUser.save();
      res.status(200).json({
        message: "Successfully signed up",
      });
    } catch (error) {
      let errorMessage = await errorHandler(error);
      res.status(errorMessage.status).json({
        message: errorMessage.message,
      });
    }
  },

  login: async (req, res) => {
    
    // console.log(req.body);
    try {
      let foundUser = await findOneUser(req.body.email);
      if (foundUser === 404) {
        throw {
          status: 500,
          message: "User not found, please sign up",
        };
      }
      let comparedPassword = await comparePassword(
        req.body.password,
        foundUser.password
      );
      if (comparedPassword === 409) {
        throw {
          status: 409,
          message: "Check your email and password",
        };
      }
      let jwtToken = await createJwtToken(foundUser);
      res.status(200).json({
        token: jwtToken,
      });
    } catch (error) {
      res.status(error.status).json({
        message: error.message,
      });
    }
  },
};
