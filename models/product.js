const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title must be provided'],
      minlength: 5,
      maxlength: 35,
    },
    desc: {
      type: String,
      require: [true, 'desciption must me provided'],
      minlength: 10,
    },
    img: {
      type: String,
      requred: [true, 'image must me provided'],
    },
    categories: {
      type: Array,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    price: {
      type: Number,
      requred: [true, 'price must me provided'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
