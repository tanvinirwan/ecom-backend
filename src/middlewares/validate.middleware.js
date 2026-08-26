
const apiError = require('../utils/apiError');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { verifyAccessToken } = require('../utils/token');

const validationMiddleware = asyncHandler(async(req,res,next)=>{
    const accessToken = req.cookies.accessToken ;
    if(!accessToken){
        res.status(401).json(apiError(401,"Token not found Pleasse login again"))
    }
    const decode = verifyAccessToken(accessToken) ;
    const userData = await userModel.findById({_id:decode.sub}).select("+password") ;
    if(!userData){
        res.status(404).json(apiError(404,"Not Found")) ;
    }
    req.user = userData ;
    next() ;
});

module.exports = {validationMiddleware} ;