require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const products = require("./products");

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const categories = await Category.find();

    const resolveCategoryPath = (path) => {
      let parent = null;

      for (const slug of path) {
        const category = categories.find(
          (c) => c.slug === slug && String(c.parent) === String(parent),
        );

        if (!category) {
          throw new Error(`Category path not found: ${path.join(" > ")}`);
        }

        parent = category._id;
      }

      return parent;
    };

    const mappedProducts = products.map((product) => ({
      ...product,
      category: resolveCategoryPath(product.categoryPath),
    }));

    await Product.deleteMany();
    console.log("Existing products removed");

    await Product.insertMany(mappedProducts);
    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedProducts();
