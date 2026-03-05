module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define('Package', {
    packageName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  return Package;
};