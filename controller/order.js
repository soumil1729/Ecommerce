const Order = require('../models/order');

//get user order
const getOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all order for admin
const getALLOrder = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

//create order
const createOrder = async (req, res) => {
  try {
    const cart = await Order.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update order
const updateOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

//d
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getOrder,
  getALLOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
