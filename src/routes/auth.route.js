const express = require("express");

const authrouter = express.Router();

//const validationMiddleware = require('../middlewares/validate.middleware') ;

const authController = require("../modules/auth/auth.controller");

authrouter.post("/register", authController.registerController);

authrouter.post("/login", authController.loginController);

authrouter.post("/refresh", authController.refreshController);

authrouter.delete("/logout",authController.logoutController) ;

authrouter.post("/changePassword",authController.changePasswordController);

module.exports = authrouter;