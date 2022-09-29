const { User } = require("../models");

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
  }
};
