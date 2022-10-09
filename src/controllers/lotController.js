const { Lot, Item } = require("../models");
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

exports.getLot = async (req, res, next) => {
  try {
    const lots = await Lot.findOne({
      where: { status: "Ongoing" },
      include: Item,
    });
    res.status(200).json({ lots });
  } catch (err) {
    next(err);
  }
};

exports.updateLot = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const obj = {};
    if (status) {
      obj.status = status;
    }
    await Lot.update(obj, { where: { id } });
    res.status(200).json({ message: "lot successfully edited" });
  } catch (err) {
    console.log(err);
  }
};
