const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = process.env.MONGODB_URL_LOCAl
const mongoURL = process.env.MONGODB_URL

// Modern Mongoose connection (no deprecated options needed)
mongoose.connect(mongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

module.exports = db;
