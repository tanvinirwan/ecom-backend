const jwt = require("jsonwebtoken");

require("dotenv").config();

const signAccessToken = (user) => {
    return jwt.sign(
        {
            sub: String(user._id),
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m"
        }
    );
};

const signRefreshToken = (user) => {
    return jwt.sign(
        {
            sub: String(user._id),
            role: user.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d"
        }
    );
};

const accessCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/v1/auth",
    maxAge: 15 * 60 * 1000
});

const refreshCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/v1/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );
};

const verifyRefreshToken = (token) => {
    return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    );
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    refreshCookieOptions,
    accessCookieOptions
};