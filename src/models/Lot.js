module.exports = (sequelize, DataTypes) => {
  const Lot = sequelize.define(
    "Lot",
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
      startingBid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      auctionStart: {
        type: DataTypes.DATE,
      },
      auctionEnd: {
        type: DataTypes.DATE,
      },
      winningBid: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("Bidding Closed", "Ongoing", "Pending"),
        defaultValue: "Pending",
      },
    },
    { underscored: true }
  );

  Lot.associate = (db) => {
    Lot.hasMany(db.Bid, {
      foreignKey: {
        name: "lotId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Lot.belongsTo(db.Item, {
      foreignKey: {
        name: "itemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Lot;
};
