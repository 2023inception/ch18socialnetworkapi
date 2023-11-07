const Model = require('../models/index');
const Messages = require('../helper/messages');
const catchAsync = require('../middlewares/catchAsync');
const { sendResponse } = require('../middlewares/response');

const handleResponse = (res, success, message, data = null) => {
    sendResponse(res, success, message, data);
};

module.exports = {
    getAllUsers: catchAsync(async (req, res) => {
        const users = await Model.User.find();
        handleResponse(res, users.length > 0, Messages.getAllUsers, users || "Null");
    }),

    getUserById: catchAsync(async (req, res) => {
        const userId = req.params.userId;
        const user = await Model.User.findById(userId).populate('thoughts').populate('friends');
        handleResponse(res, user, Messages.getUserById, user || "Null");
    }),

    createUser: catchAsync(async (req, res) => {
        const user = await Model.User.create(req.body);
        handleResponse(res, user, Messages.createUser, user || "Null");
    }),

    updateUser: catchAsync(async (req, res) => {
        const userId = req.params.userId;
        const updatedUser = await Model.User.findByIdAndUpdate(userId, req.body, { new: true });
        handleResponse(res, updatedUser, Messages.updateUser, updatedUser || "Null");
    }),

    deleteUser: catchAsync(async (req, res) => {
        const userId = req.params.userId;
        const deletedUser = await Model.User.findByIdAndDelete(userId);
        handleResponse(res, deletedUser, Messages.deleteUser, "Null");
    }),

    addFriend: catchAsync(async (req, res) => {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        const updatedUser = await Model.User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
        handleResponse(res, updatedUser, Messages.addFriend, updatedUser);
    }),

    removeFriend: catchAsync(async (req, res) => {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        const updatedUser = await Model.User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
        handleResponse(res, updatedUser, Messages.removeFriend, updatedUser);
    }),
};
