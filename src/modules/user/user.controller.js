const getOwnProfileService = require("./user.service")

const getOwnProfileController = asyncHandler(async(req,res)=>{
    const userData = await getOwnProfileService({userID:req.user._id}) ;
    res.status(200,json(apiResponse(200,userData,"user data fetch successfully"))) ;
    
})
// const getOwnProfileService = async()=>{

// }
// const getOwnProfileService = async()=>{

// }
// const getOwnProfileService = async()=>{

// }
// const getOwnProfileService = async()=>{

// }
module.exports = {
    getOwnProfileController
}