const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  logo: { url: String, publicId: String },
  isActive: { type: Boolean, default: true },
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
