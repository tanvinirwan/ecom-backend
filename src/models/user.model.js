const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
addresses: 
    {
      label: String,
      fullName: String,
      phone: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
      isDefault: { type: Boolean, default: false },
    }
},{id:true})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength : 128 ,
    select : false
  },
  phone: {
    type: String,
    match: /^[6-9]\d{9}$/,
  },
  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  avatar: {
    url: String,
    publicId: String,
  },
  shopName: {
    type: String,
  },
  address : [addressSchema]
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
