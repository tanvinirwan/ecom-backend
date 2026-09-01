const express = require('express') ;
const userController = require('../modules/user/user.controller') ;
const validationMiddleware = require('../middlewares/validate.middleware') ;

const userRouter = express.Router() ;


userRouter.use(validationMiddleware) ;

//***********************USER APIS*********************** 

//get own user data
userRouter.get("/me",userController.getOwnProfileController);

//update own profile
userRouter.patch("/me",userController.updateOwnProfileController) ;

//get user addresses own use profile
userRouter.get("/me/addresses",userController.getAllAddressesController) ;

//create user address 
userRouter.post("/me/addresses",userController.createAddressesController) ;

//update user address 
userRouter.patch("/me/addresses/:addId",userController.updateAddressesController) ;

//delete user address 
userRouter.delete("/me/addresses/:addId",userController.deleteAddressesController) ;


//***********************ADMIN APIS***********************  


//user status update api
userRouter.patch("/:id/status",userController.updateUserStatusController) ;
//delete user api
userRouter.delete("/:id",userController.deleteUserStatusController) ;
//get all users and sellers
userRouter.get("/",userController.getAllUserController);



module.exports = userRouter ;