const sequelize = require('../config/dbConfig'); // Ensure this path is correct
const User = require('../models/User'); // Adjust the path if necessary

const initializeUser = async () => {
  try {
    // Sync the User model with the database
    await User.sync({ force: false }); // Set force: true to drop the table if it exists
    console.log('User table has been initialized successfully.');
  } catch (error) {
    console.error('Error initializing User table:', error);
  }
};

module.exports = initializeUser;
