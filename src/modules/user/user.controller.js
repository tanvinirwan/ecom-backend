const { 
    getOwnProfileService,
    updateProfileService,
    createAddressService,
    deleteAddressService
} = require("./user.service");

const asyncHandler = require("../../utils/asyncHandler");

const userService = require('./user.service')
const apiResponse = require("../../utils/apiResponse");

const {
    UNAUTHORIZED,
    OK,
    FORBIDDEN,
    NOT_FOUND
} = require("../../utils/httpStatus");


// Get own profile
const getOwnProfileController = asyncHandler(async (req, res) => {

    const userData = await getOwnProfileService(req.user._id);

    return res
        .status(OK)
        .json(
            apiResponse(
                OK,
                userData,
                "User data fetched successfully"
            )
        );
});


// Update own profile
const updateOwnProfileController = asyncHandler(async (req, res) => {

    const data = req.body;

    let allowed = [
        "name",
        "phone",
        "profilePhoto"
    ];

    // Seller can update shopName
    if (req.user.role === "seller") {
        allowed.push("shopName");
    }

    // Check if user is trying to update an invalid field
    const invalidField = Object.keys(data).some(
        (key) => !allowed.includes(key)
    );

    if (invalidField) {
        return res
            .status(UNAUTHORIZED)
            .json(
                apiResponse(
                    UNAUTHORIZED,
                    null,
                    "You are unauthorised to update these fields"
                )
            );
    }

    const result = await updateProfileService(
        req.user._id,
        data
    );

    return res
        .status(OK)
        .json(
            apiResponse(
                OK,
                result,
                "User profile updated successfully"
            )
        );
});


const getAllAddressesController = asyncHandler(async (req, res) => {
    const addresses = await userService.getAllAddressesService(req.user._id) ;
    res.status(OK).json(apiResponse(OK,addresses,"Addresses are below")) ;
});


const createAddressesController = asyncHandler(async (req, res) => {
   
    const id = req.user._id ;
    const data = req.body ;
    const result = await userService.createAddressService(id,data) ;
    res.status(OK).json(apiResponse(OK,result,"Address created successfully")) ;
});


const updateAddressesController = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const addressId = req.params.addrId ;
    const patch = req.body ;
        res.status().json(apiResponse()) ;
});

const deleteAddressesController = asyncHandler(async(req,res)=>{
    const userData = await getOwnProfileService(userId) ;
    const address = userData.addresses.id(addressId) ;
    if(!address){
        throw apiError(NOT_FOUND,"address not found")
    }
    
});


const updateUserStatusController = asyncHandler(async (req, res) => {

});


const deleteUserStatusController = asyncHandler(async (req, res) => {

});


const getAllUserController = asyncHandler(async (req, res) => {

});



module.exports = {
    getOwnProfileController,
    updateOwnProfileController,
    getAllAddressesController,
    createAddressesController,
    updateAddressesController,
    updateUserStatusController,
    deleteUserStatusController,
    getAllUserController,
    deleteAddressesController
};