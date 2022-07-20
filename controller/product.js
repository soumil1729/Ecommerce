const Product = require('../models/product');

//-------get all products----------
const getAllProduct = async (req, res) => {
  const byNew = req.query.new;
  const byCategories = req.query.categories;

  try {
    let products;
    if (byNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (byCategories) {
      products = await Product.find({
        categories: {
          $in: [byCategories],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

//-----get single product-------
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

//----------create product-----------
const createProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

//=-------update----------
const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

//------------delete----------
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'product been deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
};
