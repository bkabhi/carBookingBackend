// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
