const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const convertToSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },

    image: {
        url: String,
        publicId: String
    },

    parent: {
        type: ObjectId,
        ref: "Category",
        default: null,
        index: true
    },

    position: {
        type: Number,
        default: 0
    },

    isActive: {
        type: Boolean,
        default: true
    },

});

categorySchema.pre("validate", function () {

    if (this.isModified("name") || !this.slug) {
        this.slug = convertToSlug(this.name);
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;