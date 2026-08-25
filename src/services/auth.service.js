const express = require("express");
const UserModel = require("../models/user.model");
const RefreshModel =require("../models/refresh.model");
const apiError = require("../utils/apiError");
const { hashPassword, comparePassword } = require("../../utils/password");
const { signAccessToken ,signRefreshToken } = require("../../utils/token");
const registerService = async(data) =>{
 const    {name,email,password , role} = data;

const isExist = await  UserModel.findOne({email});
if(isExist){
    throw apiError(409 , "user already exist");
}
const hashedPassword =  await hashPassword(password);
const userData = {
    name,
    email,
    password:hashedPassword,
    role:role,
}

const user=  await UserModel.create(userData);

const accessToken = signAccessToken(user);
const RefreshToken = signRefreshToken(user);

const response = await UserModel.findById(user._id).select("-password");
return {user}

};



const createRefreshService = async({userId,tokens})=>{
    const isRefreshToken = await RefreshModel.deleteMany({
        user:userId
    });
    const refreshToken= await RefreshModel.create({
        user : userId,
        token:token,
        expiresAt : new Date (Date.now+ 7*24*60*60*1000)
    })
    return refreshToken ;
}

const loginService = async(data) =>{
    const    {email,password} = data;
    const isUser = await UserModel.findOne({email});
    if(!isUser){
    throw apiError(409 , "user already exist");
    }
    const compare = await comparePassword(password,isUser.password);
    if(!compare){
        throw apiError(401 , "user already exist");
    }

const result = await RefreshTokenModel.create({tokenHash: RefreshToken
    ,
    user:isUser._id,
    expiresAt:new Date(Date.now()+ 7*24*60*60*1000),
});
    const response= await UserModel.findById(isUser._id).select("-password");
    return {user}
}



module.exports = { registerService , loginService};