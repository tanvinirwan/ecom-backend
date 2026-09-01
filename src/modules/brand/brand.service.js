const Brand = require('../../models/brand.model') ;
const apiError = require('../../utils/apiError');
const { CONFLICT, NOT_FOUND } = require('../../utils/httpStatus');

const getAllBrandsService = async() => {
    const allBrandsData = await Brand.find({}).sort("name").lean() ;
    return allBrandsData ;
}
//slug se check is exist or not
//if exists error
//file handle and payload.logo = file
//db me save
const createBrandsService = async(payload,file) => {
    const slug = convertToSlug(payload.name) ;
    const isExist = await Brand.findOne({slug});
    if(isExist){
        throw apiError(CONFLICT,"Brand already") ;
    }
}

// isExist or not using slug 
// fields update karenge brand object mai 
// file old public id delete upload new
// db mai save
const updateBrandsService = async(brand,payload,file) => {
     const slug = convertToSlug(payload.name);
    const isExist = await CategoryModel.findOne({ slug });
    if (isExist) {
        throw apiError(CONFLICT, "Brand already exist");
    }
    brand.slug = slug;

     if (payload.name !== undefined) {
        brand.name = payload.name;
    };
    if (payload.position !== undefined) {
        brand.position = payload.position;
    };
    if (payload.isActive !== undefined) {
        brand.isActive = payload.isActive;
    };

    if (file) {
        const image = await uploadToCloudinary(file.buffer, "ecom/category");
        await destroyFromCloudinary(brand.logo?.publicId);
        brand.image = image;
        await brand.save() ;
        return brand ;
    };
}


//INCOMPLETE 
const deleteBrandsService = async(brand) => {
    //check any product is used this brand ?
    const isExist = await Brand.findById(brand._id) ;
    if(!isExist){
        throw apiError(NOT_FOUND,"Brand not found") ;
    }
    await destroyFromCloudinary(brand.logo?.publicId);
    await brand.deleteOne() ;
    return brand ;
}

module.exports = { 
    getAllBrandsService,
    createBrandsService,
    updateBrandsService,
    deleteBrandsService,
}