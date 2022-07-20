const express = require('express');
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
} = require('../controller/product');
const {
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require('../middleware/authentication');
const { auth: authenticateUser } = require('../middleware/authentication');

router
  .route('/')
  .get(getAllProduct)
  .post(authenticateUser, verifyTokenAdmin, createProduct);
router
  .route('/:id')
  .get(getProduct)
  .put(authenticateUser, verifyTokenAdmin, updateProduct)
  .delete(authenticateUser, verifyTokenAdmin, deleteProduct);

module.exports = router;
