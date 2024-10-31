const productModel = require("../models/product_model.js");

// Create Product model
const createProduct = async (req) => {
  try {
    let reqBody = req.body;
    let data = await productModel.create(reqBody);
    return { data: data };
  } catch (err) {
    return { error: err.toString() };
  }
};

//  Read Data
const readProduct = async (req, res) => {
  try {
    const data = await productModel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    return { data: data };
  } catch (error) {
    return { data: error.toString() };
  }
};

// Delete a product by Specific Id
const deleteProductById = async (req, res) => {
  try {
    const data = await productModel.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    return { data: data };
  } catch (error) {
    return { data: error.toString() };
  }
};

// Update
const updateProductById = async (req, res) => {
  try {
    let reqBody = req.body;
    let id = req.params.id;
    const data = await productModel.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    return { data: data };
  } catch (error) {
    return { error: error.toString() };
  }
};
module.exports = {
    createProduct,
    readProduct,
    deleteProductById,
    updateProductById,
  };