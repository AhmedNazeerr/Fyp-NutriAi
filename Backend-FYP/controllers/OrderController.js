const { StatusCodes } = require('http-status-codes');
const { Order, OrderItem, Cart, CartItem, Product ,sequelize} = require('../models/Main');
const {CustomAPIError} = require('../errors/index');
const createOrder = async (req, res) => {
    let transaction;
    try {
        const { userId } = req.user;
        const { email, phoneNumber, firstName, lastName, address, city, province, zipCode, Total } = req.body;

        if (!email || !phoneNumber || !firstName || !lastName || !address || !city || !province || !zipCode || !Total) {
            throw new CustomAPIError('Please fill in all the details to initiate a checkout');
        }

        if (!userId) {
            throw new CustomAPIError('Session has been expired, Login again');
        }

        // Check if the user has a cart
        const userCart = await Cart.findOne({
            where: { userId },
            include: [{ model: CartItem, include: [{ model: Product }] }],
        });

        if (!userCart || !userCart.cartItems || userCart.cartItems.length === 0) {
            throw new CustomAPIError('Cannot create an order with an empty cart');
        }

        // Start the transaction
        transaction = await sequelize.transaction();

        // Create order and order items within the transaction
        const order = await Order.create(
            {
                userId,
                email,
                phoneNumber,
                firstName,
                lastName,
                address,
                city,
                province,
                zipCode,
                Total,
            },
            { transaction }
        );

        await Promise.all(
            userCart.cartItems.map(async (cartItem) => {
                const { product, count } = cartItem;

                // Create order item without updating product stock
                await OrderItem.create(
                    {
                        orderId: order.id,
                        productId: product.id,
                        quantity: count,
                    },
                    { transaction }
                );
            })
        );

        // Commit the transaction
        await transaction.commit();

        // Clear the user's cart
        await CartItem.destroy({ where: { cartId: userCart.id } });

        // If there is only one product in the cart item, delete the cart
        if (userCart.cartItems.length === 1) {
            await userCart.destroy();
        }

        res.status(StatusCodes.CREATED).json({ order });
    } catch (error) {
        // Rollback the transaction in case of an error
        if (transaction) {
            await transaction.rollback();
        }
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const getAllOrdersByUserId = async (req, res) => {
    try {
        // Fetch all orders for the user
        const userOrders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    include: [{ model: Product }],
                },
            ],
        });

        res.status(StatusCodes.OK).json({ orders: userOrders });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const getUserOrdersById = async (req, res) => {
    try {
        const { userId } = req.params;
if(!userId){
    throw new CustomAPIError('Cannot get orders with invalid userId')
}
        // Fetch all orders for the specified user ID
        const userOrders = await Order.findAll({
            where: { userId },
            include: [
                {
                    model: OrderItem,
                    include: [{ model: Product }],
                },
            ],
        });

        res.status(StatusCodes.OK).json({ orders: userOrders });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
if(!orderId){
    throw new CustomAPIError('Kindly provide orderID in order to delete an order')
}
        // Fetch the order with associated order items
        const order = await Order.findByPk(orderId, {
            include: [{ model: OrderItem, include: [{ model: Product }] }],
        });

        if (!order) {
            throw new CustomAPIError('Order not found');
        }

        // Use a transaction to ensure atomicity
        const transaction = await sequelize.transaction();

        try {
            // Iterate through order items and update product stock
            await Promise.all(
                order.orderItems.map(async (orderItem) => {
                    const { product, quantity } = orderItem;

                    // Increment product stock
                    product.stock += quantity;
                    await product.save({ transaction });
                })
            );

            // Delete the order and associated order items
            await order.destroy({ transaction });

            // Commit the transaction
            await transaction.commit();

            res.status(StatusCodes.OK).json({ message: 'Order deleted successfully' });
        } catch (error) {
            // Rollback the transaction in case of an error
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};


module.exports = {
    createOrder,
    getAllOrdersByUserId,
    getUserOrdersById,
    deleteOrder
};

