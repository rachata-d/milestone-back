module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define(
    "Bid",
    {
      bids: {
        type: DataTypes.INTEGER,
      },
    },
    { underscored: true }
  );

  Bid.associate = (db) => {
    Bid.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Bid.belongsTo(db.Lot, {
      foreignKey: {
        name: "lotId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Bid;
};
