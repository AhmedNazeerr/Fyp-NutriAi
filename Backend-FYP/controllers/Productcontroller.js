const { Category,
    SubCategory,
    Product,Order,OrderItem} = require('../models/Main');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { Op } = require('sequelize');

const createCategory = async (req, res) => {
      const { name } = req.body;
      if(!name){
        throw new CustomError.BadRequestError("Kinldy provide a category name inorder to create a category")
      }
      const category = await Category.create({ name });
      if(category){
      res.status(StatusCodes.CREATED).json({ category });
      }
      else{
        throw new CustomError.BadRequestError('unable to create a new catgegory');
      }

  };
  
  const updateCategory = async (req, res) => {
      const { categoryId } = req.params;
      const { name } = req.body;  
      if(!name || !categoryId){
        throw new CustomError.BadRequestError("kindly provide valid values, inorder to update a category");
      }
      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw new CustomError.BadRequestError(`Cateogry not found`);
      }
      category.name = name;
      await category.save();
      res.status(StatusCodes.OK).json({ category });
  };
  
  const deleteCategory = async (req, res) => {
      const { categoryId } = req.params;
      if(!categoryId){
        throw new CustomError.BadRequestError("Kindly provide categoryID inorder to delete a catg")
      }
      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw new CustomError.BadRequestError(`Cateogry not found`);
      }
      await category.destroy();
      res.status(StatusCodes.OK).json({ message: 'Category deleted successfully' });
  };
  

  const getAllCategories = async (req, res) => {
    const categories = await Category.findAll();
    if (!categories || categories.length === 0) {
      throw new CustomError.NotFoundError('No categories found');
    }
    res.status(StatusCodes.OK).json({ categories });
  };







  // now the section for sub categories has started
  const createSubCategory = async (req, res) => {
    const {categoryId}=req.params
    const { name} = req.body;
    if(!categoryId || !name){
      throw new CustomError.BadRequestError("Kindly provide valid values to create a sub catg")
    }
      // Check if the specified category exists
      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw new CustomError.BadRequestError('Category not found');
      }
      const subCategory = await SubCategory.create({ name, categoryId });
      if(!subCategory){
        throw new CustomError.BadRequestError('Unable to create a sub catg');
      }
      res.status(StatusCodes.CREATED).json({ subCategory });
  };
  
  const updateSubCategory = async (req, res) => {
      const { subCategoryId } = req.params;
      const { name } = req.body;
      if(!subCategoryId || !name){
        throw new CustomError.BadRequestError("Kindly provide valid values inorder to update a sub catg")
      }
      const subCategory = await SubCategory.findByPk(subCategoryId);
      if (!subCategory) {
        throw new CustomError.BadRequestError('SubCategory not found');
      }
      subCategory.name = name;
      await subCategory.save();
      res.status(StatusCodes.OK).json({ subCategory });
  };
  
  const deleteSubCategory = async (req, res) => {
      const { subCategoryId } = req.params;
  if(!subCategoryId){
    throw new CustomError.BadRequestError("Kinldy provide a subCategoryId inorder to delete a sub catg")
  }
      const subCategory = await SubCategory.findByPk(subCategoryId);
      if (!subCategory) {
        throw new CustomError.BadRequestError('SubCategory not found');
      }
      await subCategory.destroy();
      res.status(StatusCodes.OK).json({ message: 'SubCategory deleted successfully' });
  };

  const getAllSubCategories = async (req, res) => {
    const { categoryId } = req.params;
    if(!categoryId){
      throw new CustomError.BadRequestError("Kindly provide a category id to get all the sub catg of that catg")
    }
    const subCategories = await SubCategory.findAll({
        where: { categoryId },
    });
    if (!subCategories) {
        throw new CustomError.BadRequestError('Unable to get subcategories for the specified category');
    }
    res.status(StatusCodes.OK).json({ subCategories });
};


//this is for product

const createProduct = async (req, res) => {
    console.log(req.body); // Log the request body to the console

    const { name, price, discounted_price, images, features, how_to_apply, categoryId, subCategoryId,stock } = req.body;
    if(!name || !price || !discounted_price || !features || !how_to_apply || !categoryId ||!subCategoryId ||!stock){
      throw new CustomError.BadRequestError("Kindly provide valid values inorder to create a product")
    }
    console.log('categoryId:', categoryId);
    console.log('subCategoryId:', subCategoryId);

    // Check if the category and subcategory exist
    const category = await Category.findByPk(categoryId);
    const subCategory = await SubCategory.findByPk(subCategoryId);

    if (!category || !subCategory) {
        console.log('Category:', category);
        console.log('SubCategory:', subCategory);
        throw new CustomError.BadRequestError('Category or subcategory not found');
    }

    const product = await Product.create({
        name,
        price,
        discounted_price,
        features,
        how_to_apply,
        categoryId,
        subCategoryId,
        stock
    });

    if (!product) {
        throw new CustomError.BadRequestError('Unable to create a new product');
    }
    res.status(StatusCodes.CREATED).json({product})
   
};



const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, price, discounted_price, images, features, how_to_apply,categoryId,  subCategoryId,stock } = req.body;
if(!productId || !name || !discounted_price || !features || !how_to_apply || !categoryId || !subCategoryId || !stock){
  throw new CustomError.BadRequestError("Kindly provide valid values, inorder to update a product")
}
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new CustomError.BadRequestError('Product not found');
    }

    product.name = name;
    product.price = price;
    product.discounted_price = discounted_price;
    product.features = features;
    product.how_to_apply = how_to_apply;
    product.categoryId=categoryId;
    product.subCategoryId=subCategoryId;
    product.stock=stock;

    await product.save();

    res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
      throw new CustomError.BadRequestError("Kindly provide productID, inorder to delete a product");
  }

  // Find the product and its related records
  const product = await Product.findByPk(productId, {
      include: [
          {
              model: OrderItem,
              include: [
                  {
                      model: Order,
                  },
              ],
          },
          {
              model: CartItem,
              include: [
                  {
                      model: Cart,
                  },
              ],
          },
      ],
  });

  if (!product) {
      throw new CustomError.BadRequestError('Product not found');
  }

  // Use a transaction to ensure atomicity
  const transaction = await sequelize.transaction();
  try {
      // Delete related OrderItems and Orders
      await Promise.all(
          product.orderItems.map(async (orderItem) => {
              const { order } = orderItem;
              await orderItem.destroy({ transaction });

              // Check if the order has other items; if not, delete the order
              const orderItemsCount = await OrderItem.count({
                  where: { orderId: order.id },
              });

              if (orderItemsCount === 0) {
                  await order.destroy({ transaction });
              }
          })
      );

      // Delete related CartItems and Carts
      await Promise.all(
          product.cartItems.map(async (cartItem) => {
              const { cart } = cartItem;
              await cartItem.destroy({ transaction });

              // Check if the cart has other items; if not, delete the cart
              const cartItemsCount = await CartItem.count({
                  where: { cartId: cart.id },
              });

              if (cartItemsCount === 0) {
                  await cart.destroy({ transaction });
              }
          })
      );

      // Delete the product itself
      await product.destroy({ transaction });

      // Commit the transaction
      await transaction.commit();

      res.status(StatusCodes.OK).json({ message: 'Product deleted successfully' });
  } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
  }
};

const getAllProducts = async (req, res) => {
    // Parse query parameters
    const { page = 1, limit = 10, categoryId, subcategoryId } = req.query;
    console.log('Received parameters:', { page, limit, categoryId, subcategoryId });
    const offset = (page - 1) * limit;

    // Build the where condition based on filters
    const whereCondition = {};
    if (categoryId !== undefined) {
        whereCondition['$Category.id$'] = categoryId;
    }
    if (subcategoryId !== undefined) {
        whereCondition['$subCategory.id$'] = subcategoryId;
    }

    // Fetch products with pagination, filters, and order by ID
    const products = await Product.findAndCountAll({
        include: [
            {
                model: Category,
                attributes: [],
                where: categoryId !== undefined ? { id: categoryId } : {},
            },
            {
                model: SubCategory,
                attributes: [],
                where: subcategoryId !== undefined ? { id: subcategoryId } : {},
                as: 'subCategory',
            },
        ],
        attributes: ['id', 'name', 'price', 'discounted_price', 'features', 'how_to_apply','createdAt', 'updatedAt'],
        where: whereCondition,
        limit: +limit,
        offset: +offset,
        order: [['id', 'ASC']],
    });

    // Respond with the products and count
    res.status(StatusCodes.OK).json({ products });
};
    
  
  

  module.exports = {
    createCategory,
    updateCategory,
    getAllCategories,
    deleteCategory,
createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
  };
  