const { StatusCodes } = require('http-status-codes');
const { Cart, CartItem, Product, User,sequelize } = require('../models/Main'); // Update the path as needed
const {BadRequestError} = require('../errors/index');
const { CountryCodes } = require('validator/lib/isISO31661Alpha2');

// Function to add an item to the user's cart
const addToCart = async (req, res) => {
    try {
        const { productId, count } = req.body;
        const { userId } = req.user;
        if(!productId || !count ){
            throw new BadRequestError('Cart cannot get active by invalid values')
        }
        if(!userId){
            throw new BadRequestError('Session has been expired,Login in again')
        }
        // Check if the product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new BadRequestError('Product not found');
        }

        // Check if the product is in stock
        if (product.stock === 0) {
            throw new BadRequestError('Product is out of stock');
        }

        // Check if the selected count is greater than the product in stock
        if (count > product.stock) {
            throw new BadRequestError('Selected count is greater than the available stock');
        }

        // Check if the user has a cart, if not, create one
        let userCart = await Cart.findOne({
            where: { userId },
            include: [{ model: CartItem, include: [{ model: Product }] }],
        });

        if (!userCart) {
            userCart = await Cart.create({ userId });
        }

        // Check if the item is already in the cart
        const existingCartItem = userCart.cartItems && userCart.cartItems.find((item) => item.productId === productId);

        if (count === 0) {
            // If the count is 0, remove the item from the cart
            if (existingCartItem) {
                await CartItem.destroy({ where: { id: existingCartItem.id } });
            }
        } else {
            // If the item already exists, update the quantity
            const newCount = Math.min(count, product.stock); // Add the minimum of count and available stock
            if (existingCartItem) {
                existingCartItem.count = newCount;
                await existingCartItem.save();
            } else {
                // If the item doesn't exist, create a new cart item
                await CartItem.create({
                    productId,
                    count: newCount,
                    cartId: userCart.id,
                });
            }

            // Subtract the selected count from the product stock
            product.stock -= count;
            if (product.stock < 0) {
                product.stock = 0;
            }
            await product.save();
        }

        // Fetch the updated cart
        userCart = await Cart.findByPk(userCart.id, {
            include: [{ model: CartItem, include: [{ model: Product }] }],
        });

        // Send success response
        res.status(StatusCodes.OK).json({ cart: userCart });
    } catch (error) {
        throw error;
    }
};



// Function to update the user's cart
const inccartitem = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        if (!userId) {
            throw new BadRequestError('Session has been expired login in Again');
        }
        if (!id) {
            throw new BadRequestError('Invalid cartItem data');
        }

        // Check if the user has a cart
        const userCart = await Cart.findOne({
            where: { userId },
            include: [{ model: CartItem, include: [{ model: Product }] }],
        });

        if (!userCart) {
            throw new BadRequestError('Cart not found');
        }

        // Find the specific cart item to update
        const cartItem = await CartItem.findByPk(id, {
            include: [{ model: Product }],
        });

        if (!cartItem || cartItem.cartId !== userCart.id) {
            throw new BadRequestError('Invalid cart item');
        }

        const product = cartItem.product;

        // Check if stock is available
        if (product.stock > 0) {
            // Increment count by one
            cartItem.count += 1;
            product.stock -= 1;

            // Update cart item count and subtract from product stock
            await Promise.all([cartItem.save(), product.save()]);

            // Fetch the updated cart
            const updatedCart = await Cart.findByPk(userCart.id, {
                include: [{ model: CartItem, include: [{ model: Product }] }],
            });

            res.status(StatusCodes.OK).json({ cart: updatedCart });
        } else {
            throw new BadRequestError(`Product ${product.name} is out of stock`);
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};


const deccartitem = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        if (!userId) {
            throw new BadRequestError('Session has been expired login in Again');
        }
        if (!id) {
            throw new BadRequestError('Invalid cartItem data');
        }

        // Check if the user has a cart
        const userCart = await Cart.findOne({
            where: { userId },
            include: [{ model: CartItem, include: [{ model: Product }] }],
        });

        if (!userCart) {
            throw new BadRequestError('Cart not found');
        }

        // Find the specific cart item to update
        const cartItem = await CartItem.findByPk(id, {
            include: [{ model: Product }],
        });

        if (!cartItem || cartItem.cartId !== userCart.id) {
            throw new BadRequestError('Invalid cart item');
        }

        const product = cartItem.product;

        // Check if count is greater than 0
        if (cartItem.count > 0) {
            // Decrement count by one
            cartItem.count -= 1;
            product.stock += 1;

            // Update cart item count and add to product stock
            await Promise.all([cartItem.save(), product.save()]);

            // If count becomes zero, remove the cart item
            if (cartItem.count === 0) {
                await cartItem.destroy();
            }

            // Fetch the updated cart
            const updatedCart = await Cart.findByPk(userCart.id, {
                include: [{ model: CartItem, include: [{ model: Product }] }],
            });

            res.status(StatusCodes.OK).json({ cart: updatedCart });
        } else {
            throw new BadRequestError('Cart item count is already at the minimum');
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};





const getCartItems = async (req, res) => {
    const { userId } = req.user; // Assuming you have a middleware to extract the user from the request
    if (!userId) {
        throw new BadRequestError('Session has been expired login in Again');
    }
    // Check if the user has a cart
    const userCart = await Cart.findOne({
        where: { userId },
        include: [{ model: CartItem, include: [{ model: Product }] }],
    });

    if (!userCart) {
        throw new BadRequestError.BadRequestError('Cart not found');
    }

    res.status(StatusCodes.OK).json({ cartItems: userCart.cartItems });
};

module.exports = {
    addToCart,
    inccartitem,
    deccartitem ,
    getCartItems
};
