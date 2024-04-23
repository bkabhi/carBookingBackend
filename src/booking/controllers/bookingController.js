// controllers/bookingController.js
const Booking = require('../models/Booking');

// Controller function to get bookings by phone number with pagination (fallback to all if not found)
exports.getBookings = async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const page = parseInt(req.query.page) || 1; // Default page is 1 if not specified
    let limit = parseInt(req.query.limit) || 10; 

    try {
        let query = { phoneNumber }; // MongoDB query to find bookings by phone number
        let totalBookingsCount; // Total number of bookings for the specified phone number
        let bookings; // Array to store retrieved bookings

        // Check if phone number is specified
        if (phoneNumber) {
            // Count total number of bookings matching the phone number
            totalBookingsCount = await Booking.countDocuments(query);

            // Retrieve bookings for the specified phone number with pagination
            bookings = await Booking.find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
        } else {
            // If phone number is not specified, retrieve all bookings (no filter)
            totalBookingsCount = await Booking.countDocuments();
            bookings = await Booking.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
        }

        // Return paginated bookings along with pagination metadata
        res.status(200).json({
            totalBookings: totalBookingsCount,
            currentPage: page,
            totalPages: Math.ceil(totalBookingsCount / limit),
            bookings
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBooking = async (req, res) => {
    const { pickupLocation, dropLocation, phoneNumber } = req.body;
    // const userId = req.user._id;

    try {
        // Create a new booking instance associated with the authenticated user
        const newBooking = new Booking({
            // userId: userId,
            pickupLocation,
            dropLocation,
            phoneNumber,
        });

        // Save the new booking to the database
        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
