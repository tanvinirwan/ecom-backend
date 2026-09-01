const asyncHandler = require("../../utils/asyncHandler");
const Category = require("../../models/category.model") ;
const categoryService = require("./category.service") ;
const apiResponse = require("../../utils/apiResponse");

const getAllCategoryController = asyncHandler(async(req,res)=>{
    const categoryData = await categoryService.getAllCategoryService() ;
    res.status(OK).json(OK,categoryData,"Data delivered successfully!") ;
});


//create categories
//two levels
//check parent exist?
//check subparent exist ?
// file category image handle
// save to db

const createCategoryController = asyncHandler(async(req,res)=>{
    const data = req.body ;
    const file = req.file ;
    const result = await catergoryService.createCategoryService(data,file);
    res.status(CREATED,json(apiResponse(CREATED,result,"created successfully")));
});

const updateCategoryController = asyncHandler(async(req,res)=>{

});

const deleteCategoryController = asyncHandler(async(req,res)=>{

});

const getAllTreeCategoryController = asyncHandler(async(req,res)=>{

});

module.exports = {
    getAllCategoryController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
    getAllTreeCategoryController
};
