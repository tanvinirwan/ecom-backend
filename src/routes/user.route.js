const express = require('express') ;
const userController = require('')


const userRouter = express.Router() ;


userRouter.use(validationMiddleware) ;
userRouter.get("/me",userController.getOwnProfileController);



module.exports = userRouter ;