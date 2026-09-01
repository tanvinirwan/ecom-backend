const asyncHandler = require('../../utils/asyncHandler');
const {OK} = require('../../utils/httpStatus')

const searchProducts = asyncHandler(async(req,res)=>{
    const result = await ProductService.search() ;
    res.status(OK).json(OK,result, "Product data fetched successfully")
})
const getsingleProduct = asyncHandler(async(req,res)=>{
    const result = await ProductService.getsingle() ;
    res.status(OK).json(OK,result, "Single Product data fetched successfully")
})
const getAllSellerProduct = asyncHandler(async(req,res)=>{
    const result = await ProductService.getAllSeller() ;
    res.status(OK).json(OK,result, "Seller Product data fetched successfully")
})
const updateProduct = asyncHandler(async(req,res)=>{
    const result = await ProductService.updateSingle() ;
    res.status(OK).json(OK,result, "Updated Product successfully")
})
const deleteProduct = asyncHandler(async(req,res)=>{
    const result = await ProductService.deleteSIngle() ;
    res.status(OK).json(OK,result, "Deleted Product successfully")
})
const updateProductStatus = asyncHandler(async(req,res)=>{
    const result = await ProductService.updateStatus() ;
    res.status(OK).json(OK,result, "Updated product status successfully")
})
const getAllProductsAdmin = asyncHandler(async(req,res)=>{
    const result = await ProductService.create() ;
    res.status(OK).json(OK,result, "Product created successfully")
})
const getAllProductListFilter = asyncHandler(async(req,res)=>{
    const result = await ProductService.getAllProductsFilter() ;
    res.status(OK).json(OK,result, "Fetched filterd data successfully")
})

const 


module.exports = {
    searchProducts,
    getsingleProduct,
    getAllSellerProduct,
    updateSingle,
    deleteSingle,
    updateProductStatus,
    getAllProductsAdmin,
    getAllProductListFilter
};