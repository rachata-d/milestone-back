module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      picture: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("available", "sold", "display"),
        defaultValue: "available",
      },
    },
    { underscored: true }
  );

  Item.associate = (db) => {
    Item.hasOne(db.Lot, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Item.hasMany(db.Watchlist, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Item.belongsTo(db.Admin, {
      foreignKey: {
        name: "adminId",
        allowNull: false,
      },
    });

    Item.belongsTo(db.Category, {
      foreignKey: "categoryId",
      allowNull: false,
    });
  };
  return Item;
};
