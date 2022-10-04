const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { Admin } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      throw new AppError("unauthenticated", 401);
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      throw new AppError("unauthenticated", 401);
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "private_key"
    );

    const admin = await Admin.findOne({
      where: { id: payload.id },
      attributes: { exclude: "password" },
    });
    if (!admin) {
      throw new AppError("unauthenticated", 401);
    }

    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
};
