// db.js
const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
// Replace 'your-database-connection' with your actual database connection details
const sequelize = new Sequelize('u336018257_fyp', 'u336018257_fyp', 'Ahmed@9211', {
  host: '89.117.157.1',
  dialect: 'mysql',
  dialectModule: mysql2
   // Change this to your database dialect if needed
});

// Define Category model
const Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }, 
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Define SubCategory model
const SubCategory = sequelize.define('subCategory', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


// Define Product model
const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  discounted_price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  images: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  features: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  how_to_apply: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: true, // Make the foreign key nullable
},
subCategoryId: {
    type: Sequelize.INTEGER,
    allowNull: true, // Make the foreign key nullable
},
stock: {
  type: Sequelize.INTEGER,
  allowNull: false,
},
  // Other fields for the product
});

// Define Cart model
const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Other fields for the cart
});

// Define CartItem model
const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Define User model
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  activation_status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  role:{
    type:Sequelize.STRING,
    defaultValue:"user"
  }
  // Other fields for the user
});

// Define Order model
const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  province: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Status:{
    type:Sequelize.STRING,
    defaultValue:"Pending"
  },
  Total:{
    type:Sequelize.INTEGER,
    defaultValue:0
  }
});

// Define OrderItem model
const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Define relationships
SubCategory.belongsTo(Category, { onDelete: 'CASCADE' });
Category.hasMany(SubCategory, { onDelete: 'CASCADE' });

Product.belongsTo(Category, { foreignKey: 'categoryId', allowNull: true, onDelete: 'SET NULL' });
Product.belongsTo(SubCategory, { foreignKey: 'subCategoryId', allowNull: true, onDelete: 'SET NULL' });
Cart.belongsTo(User, { onDelete: 'CASCADE' }); // Delete associated cart when user is deleted
User.hasMany(Cart, { onDelete: 'CASCADE' }); // Cascade delete when user is deleted

CartItem.belongsTo(Product, { onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { onDelete: 'CASCADE' });
Cart.hasMany(CartItem, { onDelete: 'CASCADE' });

Order.belongsTo(User, { onDelete: 'CASCADE' });
User.hasMany(Order, { onDelete: 'CASCADE' });

OrderItem.belongsTo(Order, { onDelete: 'CASCADE' });
Order.hasMany(OrderItem, { onDelete: 'CASCADE' });

OrderItem.belongsTo(Order, { onDelete: 'CASCADE' });
Order.hasMany(OrderItem, { onDelete: 'CASCADE' });

OrderItem.belongsTo(Product, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });
Product.hasMany(OrderItem, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });


module.exports = {
  sequelize,
  Category,
  SubCategory,
  Product,
  Cart,
  CartItem,
  User,
  Order,
  OrderItem,
};
