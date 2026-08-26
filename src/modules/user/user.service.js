const getOwnProfileService = async()=>{
    const result = await UserModel.findById(userId) ;
    if(!result){
        throw apiError(404,"user not found") ;
    }
    return result ;
};

module.exports = getOwnProfileService ;