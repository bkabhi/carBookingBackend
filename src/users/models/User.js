// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    password: { type: String, required: false },
    email: { type: String, required: false, unique: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
