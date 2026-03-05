const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Package = require('./Package')(sequelize, Sequelize);
db.Class = require('./Class')(sequelize, Sequelize);
db.Enrollment = require('./Enrollment')(sequelize, Sequelize);

// Associations
db.User.belongsToMany(db.Class, {
  through: db.Enrollment,
  foreignKey: 'userId'
});

db.Class.belongsToMany(db.User, {
  through: db.Enrollment,
  foreignKey: 'classId'
});

db.User.hasMany(db.Enrollment, { foreignKey: 'userId' });
db.Class.hasMany(db.Enrollment, { foreignKey: 'classId' });

db.Enrollment.belongsTo(db.User, { foreignKey: 'userId' });
db.Enrollment.belongsTo(db.Class, { foreignKey: 'classId' });

module.exports = db;