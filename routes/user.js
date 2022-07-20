const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  getUserStats,
} = require('../controller/user');
const {
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require('../middleware/authentication');

router.route('/').get(verifyTokenAdmin, getAllUsers);
router.route('/stats').get(verifyTokenAdmin, getUserStats);
router
  .route('/:id')
  .get(verifyTokenAdmin, getUser)
  .put(verifyTokenAuthorization, updateUser)
  .delete(verifyTokenAuthorization, deleteUser);

module.exports = router;
