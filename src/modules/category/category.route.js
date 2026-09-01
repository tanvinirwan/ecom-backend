const express = require('express') ;
const categoryRouter = express.Router() ;
const categoryController = require('./category.controller') ;

// //get all category tree 
// categoryRouter.get("/tree",categoryController.getAllCategoryTreeController) ;

//cerate categories
categoryRouter.post("/:id",categoryController.createCategoryController) ;

//update categories
categoryRouter.patch("/:id",categoryController.updateCategoryController) ;

//delete categories
categoryRouter.delete("/:id",categoryController.deleteCategoryController) ;

//get all categories
categoryRouter.get("/",categoryController.getAllCategoryController) ;

//

module.exports = categoryRouter ;