const express = require('express');
const router = express.Router();
const {
  getOrder,
  getALLOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controller/order');

const {
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require('../middleware/authentication');

router
  .route('/:userId')
  .get(verifyTokenAuthorization, getOrder)
  .post(createOrder);
router.route('/').get(verifyTokenAdmin, getALLOrder);
router.route('/:id').put(updateOrder).delete(deleteOrder);

module.exports = router;
