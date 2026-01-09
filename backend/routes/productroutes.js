const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// POST create product (temporary)
router.post("/", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const product = new Product({
      name,
      price,
      image,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to create product" });
  }
});

module.exports = router;
