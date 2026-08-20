const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

app.use(express.json());
app.use(helmet());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(cookieParser());
app.use(mongoSanitize());


// Health API
// app.get("/api/v1/health", (req, res) => {
//     res.status(200).json({
//         statusCode: 200,
//         data: {
//             service: "ecom-backend",
//             env: process.env.NODE_ENV,
//             uptimeSeconds: Math.round(process.uptime()),
//             timestamp: new Date().toISOString(),
//         },
//         message: "API is running",
//     });
// });


// Test error API
app.get("/api/v1/boom", async (req, res, next) => {
    try {
        throw new Error("This error was thrown on purpose to test error handling");
    } catch (error) {
        next(error);
    }
});


module.exports = app;