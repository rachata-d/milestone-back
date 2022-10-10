const { Lot, Item, Bid } = require("../models");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");

exports.createLot = async (req, res, next) => {
  try {
    const {
      name,
      description,
      startingBid,
      auctionStart,
      auctionEnd,
      // winningBid,
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
      where: { status: { [Op.or]: ["Ongoing", "Pending"] } },
      include: Item,
    });

    const highestBid = await Bid.findOne({
      where: { lotId: lots.id },
      order: [["bids", "desc"]],
    });
    res.status(200).json({ lots, highestBid: highestBid?.bids });
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
