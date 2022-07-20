const { verifyTokenAuthorization } = require('../middleware/authentication');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const updateUser = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'User has been deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

//get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    const { password, ...others } = user._doc;

    console.log(others);
    res.status(200).json({ ...others });
  } catch (error) {
    res.status(404).json({ msg: 'user not found' });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  const query = req.query.new;

  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: 'no users' });
  }
};

//get user stats
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gt: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { updateUser, deleteUser, getUser, getAllUsers, getUserStats };
