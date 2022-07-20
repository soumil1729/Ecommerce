const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const connectDB = require('./db/connect');
const { auth: authenticateUser } = require('./middleware/authentication');

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const stripeRouter = require('./routes/stripe');

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/cart', authenticateUser, cartRouter);
app.use('/api/v1/orders', authenticateUser, orderRouter);
app.use('/api/v1/checkout', stripeRouter);

//server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URl);
    app.listen(port, () => console.log(`listening to port 💢${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
