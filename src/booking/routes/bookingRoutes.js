// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
// const authMiddleware = require('../../middleware/authMiddleware');

// Route to create a new booking (requires authentication)
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getBookings);


module.exports = router;
