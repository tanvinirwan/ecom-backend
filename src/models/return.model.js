const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema({
  order: { type: ObjectId, ref: "Order", required: true, index: true },
  orderItemId: { type: ObjectId, required: true }, //	_id	of	the	embedded	item
  user: { type: ObjectId, ref: "User", required: true, index: true },
  seller: { type: ObjectId, ref: "User", required: true, index: true },
  product: { type: ObjectId, ref: "Product", required: true },
  reason: { type: String, required: true, minlength: 10, maxlength: 500 },
  photo: { url: { type: String, required: true }, publicId: String }, //	exactly	ONE	photo
  status: {
    type: String,
    enum: ["requested", "approved", "rejected", "picked", "refunded"],
    default: "requested",
    index: true,
  },
  sellerNote: String,
  requestedAt: { type: Date, default: Date.now },
});

const Return = mongoose.model("Return", returnSchema);
module.exports = Return;
