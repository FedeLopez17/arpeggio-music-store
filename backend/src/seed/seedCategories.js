require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const categories = require("./categories");

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected to MongoDB");

  await Category.deleteMany();

  for (const cat of categories) {
    const parent = await Category.create({
      name: cat.name,
      slug: cat.slug,
    });

    for (const sub of cat.subCategories) {
      await Category.create({
        name: sub.name,
        slug: sub.slug,
        parent: parent._id,
      });
    }
  }

  console.log("Categories seeded");
  process.exit();
}

seed();
