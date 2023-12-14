const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

  const { addToCart, inccartitem,deccartitem ,getCartItems} = require('../controllers/CartController');

router.post('/add-to-cart',authenticateUser, authorizePermissions('user'), addToCart);
router.patch('/inccart/:id',authenticateUser, authorizePermissions('user'), inccartitem);
router.patch('/deccart/:id',authenticateUser, authorizePermissions('user'), deccartitem );
router.get('/get-cart-items',authenticateUser, authorizePermissions('user'), getCartItems);

module.exports = router;
