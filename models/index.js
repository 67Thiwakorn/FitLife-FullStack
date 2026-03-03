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
db.User.belongsToMany(db.Class, { through: db.Enrollment });
db.Class.belongsToMany(db.User, { through: db.Enrollment });

module.exports = db;