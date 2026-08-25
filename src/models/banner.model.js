const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { url: { type: String, required: true }, publicId: String },
  link: { type: String, default: "/" }, //	where	the	click	goes
  placement: {
    type: String,
    enum: ["home-hero", "home-strip", "plp", "cart", "orders"],
    required: true,
    index: true,
  },
  position: { type: Number, default: 0 }, //	sort	order	within	a	placement
  isActive: { type: Boolean, default: true },
  startsAt: Date,
  endsAt: Date, //	optional	scheduling
  createdBy: { type: ObjectId, ref: "User" },
});

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
