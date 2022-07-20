const express = require('express');
const router = express.Router();

const {
  getCart,
  getALLCart,
  createCart,
  updateCart,
  deleteCart,
} = require('../controller/cart');
const {
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require('../middleware/authentication');

router.route('/').post(createCart).get(verifyTokenAdmin, getALLCart);
router.route('/:userId').get(verifyTokenAuthorization, getCart);
router
  .route('/:id')
  .put(updateCart)
  .delete(verifyTokenAuthorization, deleteCart);
module.exports = router;
