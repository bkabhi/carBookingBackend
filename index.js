// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./src/config/db');
const bookingRoutes = require('./src/booking/routes/bookingRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
connectToDatabase(mongoUri).then((res) => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err, "Error connecting to MongoDB");
});

// Middleware
app.use(express.json());

// Routes
app.use('/api', bookingRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
