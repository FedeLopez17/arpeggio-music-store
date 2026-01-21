const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    brand: {
      type: String,
      required: true
    },
    categoryId: {
      type: String,
      required: true
    },
    subCategoryId: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    images: {
      type: [String],
      default: []
    },
    attributes: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
