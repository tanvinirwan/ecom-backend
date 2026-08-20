const connectDB = require("./config/db");
const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server listening on port: ${PORT}`);
        });

    } catch (err) {
        console.error("Database connection failed:", err.message);
    }
};

start();