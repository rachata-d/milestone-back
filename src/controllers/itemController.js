const { Item } = require("../models");
const AppError = require("../utils/appError");
const cloudinary = require("../utils/cloudinary");

exports.createItem = async (req, res, next) => {
  try {
    const { name, description, categoryId } = req.body;
    if (!name || !name.trim()) {
      throw new AppError("name is required", 400);
    }

    const url = await cloudinary.upload(req.file.path);

    const item = await Item.create({
      name,
      description,
      categoryId,
      adminId: req.admin.id,
      picture: url,
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
