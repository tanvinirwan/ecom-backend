const UserModel = require("../models/user.model");
const RefreshModel = require("../models/refresh.model");

const apiError = require("../utils/apiError");

const { hashPassword, verifyPassword } = require("../utils/password");


// Save refresh token in database
const createRefreshService = async ({ userId, token }) => {

    // Delete old refresh token
    await RefreshModel.deleteMany({
        user: userId
    });

    // Create new refresh token
    const refreshToken = await RefreshModel.create({
        user: userId,
        token: token,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    });

    return refreshToken;
};


// Register
const registerService = async (data) => {

    const { name, email, password, role } = data;

    const isExist = await UserModel.findOne({ email });

    if (isExist) {
        throw apiError(409, "user already exist");
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    const response = await UserModel
        .findById(user._id)
        .select("-password");

    return {
        user: response
    };
};


// Login
const loginService = async (data) => {

    const { email, password } = data;

    const isUser = await UserModel.findOne({ email }).select("+password");

    if (!isUser) {
        throw apiError(401, "invalid email or password");
    }

   const isPasswordCorrect = await verifyPassword(
    password,
    isUser.password
);

    if (!isPasswordCorrect) {
        throw apiError(401, "invalid email or password");
    }

    const user = await UserModel
        .findById(isUser._id)
        .select("-password");

    return {
        user
    };
};



//LOGOUT

const logoutService = async(refreshToken) => {
    const sessionData = await RefreshModel.findOne({refreshToken:refreshToken}) ;
    if(!sessionData){
        throw apiError(404,"User does not exists") ;
    }
    await RefreshModel.deleteOne({
        token : refreshToken
    }) ;

    return{
        userId : sessionData.user ,
        sessionId : sessionData._id
    };
}



//

const changePasswordService = async(data) => {
    const {userId,newPassword,oldPassword} = data ;
    const user = await UserModel.findById({_id:userId}).select("+password") ;

    if(!user){
        throw apiError(404,"User not found");
    }

    //verify password
    const decode = await verifyPassword(oldPassword,user.password)

    if(!decode){
        throw apiError(401,"Invalid Credentials") ;
    }

    //hash new password
    const hashNewPassword = await hashPassword(newPassword) ;

    user.password = hashNewPassword ;
    await user.save() ;

}

module.exports = {
    registerService,
    loginService,
    createRefreshService
    ,logoutService,
    changePasswordService
};