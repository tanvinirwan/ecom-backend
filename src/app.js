const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const mongoSanitize = require("express-mongo-sanitize");

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const notFound = require("./middlewares/notFound.middleware");

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
// app.use(mongoSanitize());

// Auth routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user",userRouter) ;
// Test API
app.get("/api/v1/boom", async (req, res, next) => {
    try {
        throw new Error("This error was thrown on purpose to test error handling");
    } catch (error) {
        next(error);
    }
});

// Error handling should come LAST
app.use(notFound);
// app.use(errorHandler);

module.exports = app;