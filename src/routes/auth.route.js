const express = require("express");
const app  = express();
const authrouter = express.Router();
const authController = require("../modules/auth/auth.controller");
authrouter.post("/register" , authController.registerController );
authrouter.post("/login",authController.loginController);
// authrouter.post("/refresh",);
// authrouter.post("/logout",);
// authrouter.get("/me" , );
// authrouter.patch("/change-password" , );

module.exports = authrouter;