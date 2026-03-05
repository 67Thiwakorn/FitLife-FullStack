require('dotenv').config();
const express = require('express');
const app = express();

const db = require('./models');

app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

app.use('/users', userRoutes);
app.use('/classes', classRoutes);
app.use('/enrollments', enrollmentRoutes);

const PORT = 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});