const express = require('express');
const {
  createProduct,
  readProduct,
  deleteProductById,
  updateProductById,
} = require("../app/controllers/product_controller");
const router = express.Router();
router.post('/createProduct', createProduct);
router.get('readProduct/:id', readProduct);
router.put('updateProductById/:id', updateProductById);
router.delete('deleteProductById/:id', deleteProductById);

module.exports = router;
