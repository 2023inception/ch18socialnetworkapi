const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// User routes
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

// Friend routes for a user
router.post('/:userId/friends/:friendId', UserController.addFriend);
router.delete('/:userId/friends/:friendId', UserController.removeFriend);

module.exports = router;
