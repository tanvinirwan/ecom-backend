const Category = require("../../models/category.model")
const apiError = require("../../utils/apiError")
const { CONFLICT, BAD_REQUEST } = require("../../utils/httpStatus");
const uploadToCloudinary = require("../../utils/uploadToCloudinary") ;

const getAllCategoryService = async() => {
    const result = await Category.find({isActive:true}).lean() ;
    return result ;
};

const levelCheck = async(parentId) => {
    if(!parentId){
        return null;
    }
    const parent = await Category.findById(parentId) ;
    if(parent.parent){
        throw apiError(BAD_REQUEST,"Only two levels are allowed!")
    }
    return parent._id ;
}

const createCategoryService= async(payload,file)=>{
    const isExist = await Category.findOne({slug:payload.slug})
    if(isExist){
        throw apiError(CONFLICT,"Category already exists!");
    }
    const parent = await levelCheck(payload.parent) ;
    payload.parent = parent ;
    if(file){
        const image = await uploadToCloudinary(file.buffer,"eecom/category") ;
        payload.image = image ;
    }
    const result = await Category.create(payload) ;
    return result ;
}

