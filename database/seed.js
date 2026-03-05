const db = require('../models');
const { User, Class, Enrollment } = db;

async function seed() {
  await db.sequelize.sync({ force: true });

  console.log("Database synced!");

  // ===== USERS =====
  const users = await User.bulkCreate([
    { firstName: 'Super', lastName: 'Admin', email: 'admin@mail.com', role: 'admin' },
    { firstName: 'Trainer', lastName: 'One', email: 'trainer1@mail.com', role: 'trainer' },
    { firstName: 'John', lastName: 'Doe', email: 'john@mail.com', role: 'member' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane@mail.com', role: 'member' },
    { firstName: 'Mike', lastName: 'Brown', email: 'mike@mail.com', role: 'member' }
  ]);

  for (let user of users) {
    let prefix;

    if (user.role === 'admin') prefix = '01';
    else if (user.role === 'trainer') prefix = '02';
    else prefix = '03';

    const runningNumber = user.id.toString().padStart(4, '0');
    await user.update({
      code: prefix + runningNumber
    });
  }

  // ===== CLASSES =====
  const classes = await Class.bulkCreate([
    { className: 'Yoga', schedule: 'Mon 09:00', capacity: 20 },
    { className: 'HIIT', schedule: 'Tue 18:00', capacity: 15 },
    { className: 'Zumba', schedule: 'Wed 17:00', capacity: 25 }
  ]);

  for (let cls of classes) {
    const runningNumber = cls.id.toString().padStart(4, '0');
    await cls.update({
      code: '04' + runningNumber
    });
  }

  // ===== ENROLLMENTS =====
  const enrollments = await Enrollment.bulkCreate([
    { userId: users[2].id, classId: classes[0].id },
    { userId: users[3].id, classId: classes[0].id },
    { userId: users[4].id, classId: classes[1].id },
    { userId: users[2].id, classId: classes[1].id },
    { userId: users[3].id, classId: classes[2].id },
    { userId: users[4].id, classId: classes[2].id },
    { userId: users[2].id, classId: classes[2].id },
    { userId: users[3].id, classId: classes[1].id }
  ]);

  for (let enroll of enrollments) {
    const runningNumber = enroll.id.toString().padStart(4, '0');
    await enroll.update({
      code: '05' + runningNumber
    });
  }

  console.log("Seeding completed!");
  process.exit();
}

seed();