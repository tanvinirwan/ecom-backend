const ProductModel = require("../../models/product.model")

const search = async({}) => {

}
const getsingle = async({}) => {

}
const getAllSeller = async({}) => {

}
const updateSingle = async({}) => {

}
const deleteSingle = async({}) => {

}
const updateStatus = async({}) => {

}
const create = async({sellerId,payload,files}) => {
    if(payload.price > payload.mrp) throw apiError(400,'Price cannot be more than MRP') ;
    if(files.length === 0 ) throw apiError(400,'Add at least one image') ;
    const images =await Promise.all(files.map(file=> uploadToCloudinary(file.buffer,"ecom/product"))) 
    payload.images=images ;
    payload.seller = sellerId ;
    const result = await ProductModel.create(payload) ;
    return result ;
}

const getAllProductsFilter = async({}) => {

}


module.exports = {
    search,
    getsingle,
    getAllSeller,
    updateSingle,
    deleteSingle,updateStatus,
    create,
    getAllProductsFilter
}