const db = require('../models');

exports.index = async (req, res) => {
  const enrollments = await db.Enrollment.findAll({
    include: [db.User, db.Class]
  });
  res.render('enrollments/index', { enrollments });
};

exports.createForm = async (req, res) => {
  const users = await db.User.findAll({ where: { role: 'member' }});
  const classes = await db.Class.findAll();
  res.render('enrollments/create', { users, classes });
};

exports.create = async (req, res) => {
  await db.Enrollment.create(req.body);
  req.flash('success', 'Enrollment created successfully');
  res.redirect('/enrollments');
};

exports.show = async (req, res) => {
  const enrollment = await db.Enrollment.findByPk(req.params.id, {
    include: [db.User, db.Class]
  });
  res.render('enrollments/show', { enrollment });
};

exports.editForm = async (req, res) => {
  const enrollment = await db.Enrollment.findByPk(req.params.id);
  const users = await db.User.findAll({ where: { role: 'member' }});
  const classes = await db.Class.findAll();
  res.render('enrollments/edit', { enrollment, users, classes });
};

exports.update = async (req, res) => {
  await db.Enrollment.update(req.body, {
    where: { id: req.params.id }
  });
  req.flash('success', 'Enrollment updated');
  res.redirect('/enrollments');
};

exports.destroy = async (req, res) => {
  await db.Enrollment.destroy({
    where: { id: req.params.id }
  });
  req.flash('success', 'Enrollment deleted');
  res.redirect('/enrollments');
};