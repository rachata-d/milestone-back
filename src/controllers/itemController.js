const { Item, Lot, sequelize } = require("../models");
const AppError = require("../utils/appError");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.createItem = async (req, res, next) => {
  try {
    const { name, description, categoryId } = req.body;
    if (!name || !name.trim()) {
      throw new AppError("name is required", 400);
    }

    if (!req.file) {
      throw new AppError("picture is required", 400);
    }

    const url = await cloudinary.upload(req.file.path);
    const item2 = await Item.create({
      name,
      description,
      categoryId,
      adminId: req.admin.id,
      picture: url,
    });

    const item = await Item.findAll();
    res.status(201).json({ item });
  } catch (err) {
    console.log(err);
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
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

exports.deleteItem = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const item = await Item.findOne({ where: { id: +req.params.id } });
    if (!item) {
      throw new AppError("item doesn't exists", 400);
    }
    await Lot.destroy({ where: { itemId: item.id }, transaction });
    await item.destroy({ transaction });
    await transaction.commit();
    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

exports.updateItems = async (req, res, next) => {
  try {
    const { id, name, description, status } = req.body;
    const obj = {};
    if (name) {
      obj.name = name;
    }
    if (description) {
      obj.description = description;
    }
    if (status) {
      obj.status = status;
    }
    await Item.update(obj, {
      where: { id },
    });
    res.status(200).json({ message: "successfully edited item" });
  } catch (err) {
    console.log(err);
  }
};
