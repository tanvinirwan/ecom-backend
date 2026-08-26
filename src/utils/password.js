const bcrypt = require("bcryptjs");
require("dotenv").config();

const SALT_ROUNDS = Number(process.env.SALT);

const hashPassword = async (plain) => {
    return await bcrypt.hash(plain, SALT_ROUNDS);
};

const verifyPassword = async (plain, hash) => {
    return await bcrypt.compare(plain, hash);
};

module.exports = {
    hashPassword,
    verifyPassword
};