require('dotenv').config();
require('express-async-errors');
// express
const express = require('express');
const app = express();
// rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');

// database
const {sequelize} = require('./models/Main');

//  routers
const authRouter = require('./routes/authRoutes');
 const productRouter = require('./routes/ProductRoutes');
 const CartRouter = require('./routes/CartRoutes');
 const OrderRouter = require('./routes/OrderRoutess');
 const UserRouter = require('./routes/userRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// app.set('trust proxy', 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 60,
//   })
// );
//app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
//app.use(cors());
// app.use(xss());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', CartRouter );
app.use('/api/v1/order', OrderRouter );
app.use('/api/v1/user', UserRouter );

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Data base has been connected successfully")
    //await sequelize.sync({ force:false });
    console.log('Database tables synchronized');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
