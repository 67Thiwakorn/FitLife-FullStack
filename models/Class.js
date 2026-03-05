module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    className: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schedule: {
      type: DataTypes.STRING
    },
    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 20
    },
    code: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  return Class;
};