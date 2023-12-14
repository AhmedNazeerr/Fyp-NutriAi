const {User,Order,OrderItem,Cart,CartItem} = require('../models/Main');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const getallusers = async (req, res) => {
  try {
    // Check if role parameter is present in the query
    const roleFilter = req.query.role;
    // Define options object to pass to findAll based on the presence of the role filter
    const options = roleFilter ? { where: { role: roleFilter } } : {};
    const users = await User.findAll(options);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateauserbyid=async(req,res)=>{
  const userId = req.params.id;
  const { name, activation_status, role } = req.body;
  if(!name || !activation_status ||!role ||!userId){
    throw new CustomError.BadRequestError("Invalid values")
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Update user fields
    user.name = name;
    user.activation_status = activation_status;
    user.role = role;

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const deleteuserbyid=async(req,res)=>{
  const userId = req.params.id;
  if(!userId){
    throw new CustomError.BadRequestError("Please provide a userID")
  }
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Cart }, { model: Order, include: OrderItem }],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Delete associated orders and order items
    const orders = user.orders || [];
    for (const order of orders) {
      await OrderItem.destroy({ where: { orderId: order.id } });
    }
    await Order.destroy({ where: { userId } });
    // Delete user
    await user.destroy();
    res.json({ message: 'User and associated data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  getallusers,
  updateauserbyid,
  deleteuserbyid
};
