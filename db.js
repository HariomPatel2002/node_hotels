const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels';

// Modern Mongoose connection (no deprecated options needed)
mongoose.connect(mongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

module.exports = db;
