const asyncHandler = require("../../utils/asyncHandler");
const { CREATED } = require("../../utils/httpStatus");

const getBrandController = asyncHandler(async() =>{

    const result = await brandService.getAllBrandsService() ;
    res.status(OK).json(OK,result,"All brands data successfully fetched!") ;

})
const createBrandController = asyncHandler(async() =>{
    const result = await brandService.createBrandsService() ;
    res.status(CREATED).json(CREATED,result,"Brand created successfully!") ;
})
const updateBrandController = asyncHandler(async() =>{
const result = await brandService.updateBrandsService() ;
    res.status(OK).json(OK,result,"Brand updated successfully!") ;

})
const deleteBrandController = asyncHandler(async() =>{
const result = await brandService.deleteBrandsService() ;
    res.status(OK).json(OK,result,"Brand deleted successfully!") ;
})

module.exports = {
    getBrandController,
    createBrandController,
    updateBrandController,
    deleteBrandController
}