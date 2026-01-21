const Category = require("../models/Category");

const getDescendantCategoryIds = async (categoryId) => {
  const categories = await Category.find().lean();
  const ids = [];

  const collect = (id) => {
    ids.push(id);
    categories
      .filter(cat => cat.parent?.toString() === id.toString())
      .forEach(child => collect(child._id));
  };

  collect(categoryId);
  return ids;
};

module.exports = {
  getDescendantCategoryIds,
};
