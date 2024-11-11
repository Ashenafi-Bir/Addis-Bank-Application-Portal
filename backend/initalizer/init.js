// init.js
const sequelize = require('./config/dbConfig');
const User = require('./models/User');

(async () => {
  await sequelize.sync({ force: true });  // Sync all models
  await User.create({
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    password: 'password123' // This will be hashed automatically
  });
  console.log('User created');
})();
