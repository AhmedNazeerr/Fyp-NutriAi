const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getallusers,
  updateauserbyid,
  deleteuserbyid
} = require('../controllers/userController');

router.route('/').get(authenticateUser, authorizePermissions('admin'), getallusers);

router.route('/:id')
.patch(authenticateUser,authorizePermissions('admin'),updateauserbyid)
.delete(authenticateUser,authorizePermissions('admin'),deleteuserbyid);

module.exports = router;
