// const dns = require("dns") ;
// dns.setServers(["8.8.8.8","8.8.4.4"]) ;


// const { configDotenv } = require('dotenv');
// const express = require('express') ;
// const app = express() ;

// const mongoose = require('mongoose') ;

// const connectDB = async() => {
//     const connection = await mongoose.connect(process.env.MONGO_URL);
//     console.log("database connection established") ;
// }
// dotenv.config();
// module.exports = connectDB ;

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Database connection established");
    } catch (err) {
        console.error("Database connection failed:", err.message);
        throw err;
    }
};

module.exports = connectDB;