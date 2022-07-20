const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'title must be provided'],
    },
    products: [
      {
        productsId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: [true, 'Total amount must be provided'],
    },
    address: {
      type: Object,
      required: [true, 'Address object must be provided'],
    },
    amount: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
