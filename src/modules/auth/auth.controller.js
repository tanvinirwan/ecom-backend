const asyncHandler = require("../../utils/asyncHandler");
const express = require("express");
const apiResponse = require("../../utils/apiResponse");
const authService = require("../../services/auth.service");

const { refreshCookieOptions,accessCookieOptions, signAccessToken, signRefreshToken } = require("../../utils/token");


const generateToken=(res,user)=>{
    const accessToken = signAccessToken(user) ;
    const refreshToken = signRefreshToken(user) ;
 res.cookie("accessToken",accessToken,accessCookieOptions)
    res.cookie("refreshToken",refreshToken ,refreshCookieOptions )

    return {accessToken:accessToken,refreshToken:refreshToken}
}


const registerController = asyncHandler(async(req,res)=>{

    const {name , email ,password ,role} = req.body;
  const userData =  await authService.registerService({name ,email,password , role});
  const tokens = generateToken(res,userData.user);
  const refreshTokendata = await AuthService.createRefreshService(userData.user._id,tokens.refreshToken) 


//   await RefreshModel.create({
//     user:result.user._id,
//     token : tokens.refreshToken,
//     expriedAt : new Date(Date.now()+7*24*60*60*1000)
//   })

    res.status(201).json(apiResponse(201,{data : userData,refreshToken:refreshTokendata,accessToken:accessTokendata}, "user created successfully"));
});

const loginController = asyncHandler(async (req,res)=>{
    const { email ,password} = req.body;
    const result = await authService.loginService({email,password});

   generateToken(result.user);

    res.status(200).json(apiResponse(200,result.tokens ,"user login successfully" ))
})
module.exports = {registerController , loginController};