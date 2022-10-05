const { Item } = require("../models");
const AppError = require("../utils/appError");

exports.createItem = async (req, res, next) => {
  try {
    const { name, description, categoryId } = req.body;
    if (!name || !name.trim()) {
      throw new AppError("name is required", 400);
    }

    const item = await Item.create({
      name,
      description,
      categoryId,
      adminId: req.admin.id,
    });

    res.status(201).json({ item });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.status(200).json({ items });
  } catch (err) {
    next(err);
  }
};
