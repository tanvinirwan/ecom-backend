const UserModel = require("../../models/user.model");
const apiError = require("../../utils/apiError");
const asyncHandler = require("../../utils/asyncHandler");
const { NOT_FOUND } = require("../../utils/httpStatus");
const { getOwnProfileController } = require("./user.controller");


// Get own profile
const getOwnProfileService = async (userId) => {

    const result = await UserModel.findById(userId);

    if (!result) {
        throw apiError(404, "User not found");
    }

    return result;
};


// Update own profile
const updateProfileService = async (id, data, image) => {

    let updateData;

    if (image) {
        updateData = {
            ...data,
            profilePhoto: image
        };
    } else {
        updateData = data;
    }

    const result = await UserModel.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true }
    );

    if (!result) {
        throw apiError(404, "User not found");
    }

    return result;
};


// get all the addresses

const getAllAddressService = async(id) => {
    const user = await UserModel.findOne(id) ;
    if(!user){
        throw apiError(NOT_FOUND,"user not found")
    }
    if(user.addresses.length===0){
        throw apiError(NOT_FOUND,"you don't have any address , please create one")
    }
    return user.addresses ;
}

const createAddressService = async(id,data) => {
    const user = await getOwnProfileService(id) ; 
    if(user.addresses.length>=5){
        throw apiError(FORBIDDEN,"max addresses limit reached,can't create more")
    }
        data.isDefault = true ;

        if(user?.addresses.length !== 0){
            user?.addresses.forEach((address)=>address.isDefault = false )
        }
            
    user.addresses.push(data) ;
    await user.save() ;
    return user ;
}

const deleteAddressService = async (userId, addressId) => {

   const user = await getOwnProfileService(id);

if (user.addresses.length >= 5) {
    throw apiError(
        403,
        "Maximum 5 addresses allowed"
    );
}

data.isDefault = true;

if (user.addresses.length !== 0) {
    user.addresses.forEach((address) => {
        address.isDefault = false;
    });
}

user.addresses.push(data);

await user.save();

return user;
};


const updateAddressService = async(userId,addressId,patch)=>{
    const userData = await getOwnProfileService(userId) ;
    const address = userData.addresses.id(addressId);
    if(!address){
        throw apiError(NOT_FOUND,"address not found")
    }
    Object.assign(address,patch);
    if(patch.isDefault){
        userData?.addresses.forEach((address)=>address.isDefault=false)
    }
    await userData.save() ;
    return userData ;
}


module.exports = {
    getOwnProfileService,
    updateProfileService,
    getAllAddressService,
    createAddressService,
    deleteAddressService
};