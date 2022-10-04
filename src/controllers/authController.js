const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { User, Admin } = require("../models");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_EXPIRES } = process.env;
const { Op } = require("sequelize");

const genToken = (payload) =>
  jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES || "1d",
  });

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
    });

    const { value, error } = schema.validate({
      firstName,
      lastName,
      password,
      email,
    });

    if (error) {
      throw new AppError("password is required", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError("email address or mobile or password is invalid", 400);
    }
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
      throw new AppError("email or password is invalid", 400);
    }
    const token = genToken({ id: user.id, role: "USER" });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      throw new AppError("email address or mobile or password is invalid", 400);
    }
    const isAdmin = await bcrypt.compare(password, admin.password);
    if (!isAdmin) {
      throw new AppError("email or password is invalid", 400);
    }
    const token = genToken({ id: admin.id, role: "ADMIN" });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};

exports.getAdmin = (req, res) => {
  res.status(200).json({ admin: req.admin });
};
