const asyncHandler = require("../../utils/asyncHandler");

const apiResponse = require("../../utils/apiResponse");
const apiError = require("../../utils/apiError");

const authService = require("../../services/auth.service");

const UserModel = require("../../models/user.model");
const RefreshModel = require("../../models/refresh.model");

const {
    refreshCookieOptions,
    accessCookieOptions,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
} = require("../../utils/token");


// Generate access token + refresh token
const generateToken = async (res, user) => {

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    // Save refresh token in database
    await authService.createRefreshService({
        userId: user._id,
        token: refreshToken
    });

    // Access token cookie
    res.cookie(
        "accessToken",
        accessToken,
        accessCookieOptions()
    );

    // Refresh token cookie
    res.cookie(
        "refreshToken",
        refreshToken,
        refreshCookieOptions()
    );

    return {
        accessToken,
        refreshToken
    };
};


// REGISTER
const registerController = asyncHandler(async (req, res) => {

    const { name, email, password, role } = req.body;

    const result = await authService.registerService({
        name,
        email,
        password,
        role
    });

    const tokens = await generateToken(res, result.user);

    res.status(201).json(
        apiResponse(
            201,
            {
                user: result.user,
                accessToken: tokens.accessToken
            },
            "user created successfully"
        )
    );
});


// LOGIN
const loginController = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await authService.loginService({
        email,
        password
    });

    const tokens = await generateToken(res, result.user);

    res.status(200).json(
        apiResponse(
            200,
            {
                user: result.user,
                accessToken: tokens.accessToken
            },
            "user login successfully"
        )
    );
});


// REFRESH TOKEN
// const refreshController = asyncHandler(async (req, res) => {

//     // Get refresh token from cookie
//     const oldRefreshToken = req.cookies.refreshToken;

//     if (!oldRefreshToken) {
//         throw apiError(401, "refresh token required");
//     }

//     // Verify refresh token
//     const decoded = verifyRefreshToken(oldRefreshToken);

//     // Check refresh token in database
//     const storedToken = await RefreshModel.findOne({
//         user: decoded.sub,
//         token: oldRefreshToken
//     });

//     if (!storedToken) {
//         throw apiError(401, "invalid refresh token");
//     }

//     // Find user
//     const user = await UserModel.findById(decoded.sub);

//     if (!user) {
//         throw apiError(401, "user not found");
//     }

//     // Generate NEW access + refresh token
//     // Also deletes old refresh token
//     // and saves new refresh token
//     const tokens = await generateToken(res, user);

//     res.status(200).json(
//         apiResponse(
//             200,
//             {
//                 accessToken: tokens.accessToken
//             },
//             "token refreshed successfully"
//         )
//     );
// });


//logout api 
// cookie delete
// refresh token delete

const logoutController = asyncHandler(async (req,res)=>{
    //finding the tokens so that we can check if the user exists
//     const refreshToken = req.cookies.refreshToken ;
//     const accessToken = req.cookies.accessToken ;
//     const result = await authService.logoutService(refreshToken) ;
//     res.clearCookie("refreshToken");

//    return res.status(200).json({
//             success: true,
//             message: "Logout successful",
//             data: result
//         });

    const accessCookie = res.clearCookie("accessToken",accessCookieOptions());
    const refreshCookie = res.clearCookie("refreshToken",refreshCookieOptions()); 
    await authService.logoutService(refreshToken) ;
    res.status(200).json(apiResponse(200,null,"User logout successfully"))
});

//CHANGE PASSWORD => //async handler - try catch wrapper
//old password // new password
//check old password sahi hai ya nahi 
//user.password = new password

const changePasswordController = asyncHandler(async(req,res) => {
    const {oldPassword,newPassword} = req.body ;
     await authService.changePasswordService({userId:req.user._id,newPassword:newPassword,oldPassword:oldPassword});
    res.status(200).json(apiResponse(200,null,"Password changed successfully")) ;
});

const refreshController = asyncHandler(async(req,res)=>{
    const oldRefreshToken = req.cookies.refreshToken ;
    if(!oldRefreshToken){
        throw apiError(404,"Refresh token not found!") ;
    }
    const decode = verifyRefreshToken(oldRefreshToken) ;
    const newAccessToken = signAccessToken(decode.sub);
    res.cookie("accessToken",newAccessToken,accessCookieOptions)
    res.status(200).json(apiResponse(200,null,"New Refresh token created and set to cookie successfully")) ;
})


module.exports = {
    registerController,
    loginController,
    refreshController,
    logoutController,
    changePasswordController
};