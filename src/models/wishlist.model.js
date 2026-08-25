const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  products: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
