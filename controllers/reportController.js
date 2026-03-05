const db = require('../models');

exports.membersInClass = async (req, res) => {
  const classes = await db.Class.findAll();
  const classId = req.query.classId;

  let selectedClass = null;

  if (classId) {
    selectedClass = await db.Class.findByPk(classId, {
      include: [{
        model: db.User,
        through: { attributes: ['enrollDate', 'status'] }
      }]
    });
  }

  res.render('reports/members-in-class', { classes, selectedClass });
};

exports.memberSchedule = async (req, res) => {
  const users = await db.User.findAll({ where: { role: 'member' }});
  const userId = req.query.userId;

  let member = null;

  if (userId) {
    member = await db.User.findByPk(userId, {
      include: [{
        model: db.Class,
        through: { attributes: ['status'] }
      }]
    });
  }

  res.render('reports/member-schedule', { users, member });
};