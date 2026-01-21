const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().lean();

    // Map by id for quick lookup
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat, children: [] };
    });

    const tree = [];

    categories.forEach((cat) => {
      if (cat.parent) {
        categoryMap[cat.parent]?.children.push(
          categoryMap[cat._id]
        );
      } else {
        tree.push(categoryMap[cat._id]);
      }
    });

    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
