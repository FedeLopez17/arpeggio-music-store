require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("./products");

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    await Product.deleteMany();
    console.log("Existing products removed");

    await Product.insertMany(products);
    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedProducts();
