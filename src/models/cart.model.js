const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [
    {
      product: { type: ObjectId, ref: "Product", required: true },
      qty: { type: Number, required: true, min: 1, max: 10 },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
