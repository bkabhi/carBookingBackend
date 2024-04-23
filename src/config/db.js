// config/dbConfig.js
const mongoose = require('mongoose');

const connectToDatabase = async (mongoUri) => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    };
    try {
        await mongoose.connect(mongoUri, connectionParams);
        // mongoose.set('debug', true);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error);
        console.log("Could not connect database!");
    }
};

module.exports = connectToDatabase;
