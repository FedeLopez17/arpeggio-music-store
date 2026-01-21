const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);

module.exports = app;