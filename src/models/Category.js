module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    { underscored: true }
  );

  Category.associate = (db) => {
    Category.hasOne(db.Item, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Category;
};
