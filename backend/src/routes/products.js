const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const { getDescendantCategoryIds } = require("../services/categoryService");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) {
      const cat = await Category.findOne({ slug: category });

      if (!cat) {
        return res.status(404).json({ message: "Category not found" });
      }

      const categoryIds = await getDescendantCategoryIds(cat._id);
      filter.category = { $in: categoryIds };
    }

    const products = await Product.find(filter)
      .populate("category", "name slug parent");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
