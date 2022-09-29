module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    { underscored: true }
  );

  Admin.associate = (db) => {
    Admin.hasMany(db.Item, {
      foreignKey: {
        name: "adminId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Admin;
};
