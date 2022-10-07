const { Lot } = require("../models");
const AppError = require("../utils/appError");

exports.createLot = async (req, res, next) => {
  try {
    const {
      name,
      description,
      startingBid,
      auctionStart,
      auctionEnd,
      winningBid,
      status,
      itemId,
    } = req.body;
    // if (!name || !name.trim()) {
    //   throw new AppError("name is required", 400);
    // }

    const lot = await Lot.create({
      name,
      description,
      startingBid,
      auctionStart,
      auctionEnd,
      winningBid,
      status,
      itemId,
    });
    res.status(201).json({ lot });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
