const { Bid } = require("../models");
const AppError = require("../utils/appError");

exports.createBid = async (req, res, next) => {
  try {
    const { bids, userId, lotId } = req.body;

    const bid = await Bid.create({ bids, userId, lotId });

    res.status(201).json({ bid });
  } catch (err) {
    throw new AppError("Invalid creation", 400);
    next(err);
  }
};

exports.getBid = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const bid = await Bid.findAll({ where: { lotId: id } });

    res.status(201).json({ bid });
  } catch (err) {
    // throw new AppError("Unable to get bid", 400);
    next(err);
  }
};
