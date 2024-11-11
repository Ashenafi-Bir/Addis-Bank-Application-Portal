// app.js
const express = require('express');
const cors = require('cors');
const path = require("path");
const sequelize = require('./config/dbConfig');

// Import routes
// const packagesRoutes = require("./routes/packages");
const authRoutes = require('./routes/authRoutes');
// const userManagementRoutes = require('./routes/userManagement');

// const authMiddleware = require('./middleware/authMiddleware');
// require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/pdfs', express.static(path.join(__dirname, 'public', 'pdfs')));

// Serve static files from the 'public' folder
app.use('/uploads', express.static(path.join(__dirname, 'public', 'upload')));

// Route handlers
// app.use("/packages", packagesRoutes);
app.use('/api/auth', authRoutes);





module.exports = app;
