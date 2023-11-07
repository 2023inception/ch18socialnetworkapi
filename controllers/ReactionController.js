const Model = require('../models/index');
const Message = require('../helper/messages');
const catchAsync = require('../middlewares/catchAsync');
const { sendResponse } = require('../middlewares/response');

const handleResponse = (res, success, message, data = null) => {
    sendResponse(res, success, message, data);
};

module.exports = {
    getAllReactions: catchAsync(async (req, res) => {
        const reactions = await Model.Reaction.find();
        handleResponse(res, reactions ? true : false, Message.getAllReactions, reactions || "Null");
    }),

    getReactionById: catchAsync(async (req, res) => {
        const reactionId = req.params.reactionId;
        const reaction = await Model.Reaction.findById(reactionId).populate('reactions');
        handleResponse(res, reaction ? true : false, Message.getReactionById, reaction || "Null");
    }),

    createReaction: catchAsync(async (req, res) => {
        const { reactionBody, username } = req.body;
        const newReaction = await Model.Reaction.create({ reactionBody, username });
        handleResponse(res, newReaction ? true : false, Message.reactionCreated, newReaction || "Null");
    }),

    updateReaction: catchAsync(async (req, res) => {
        const reactionId = req.params.reactionId;
        const updatedReaction = await Model.Reaction.findByIdAndUpdate(reactionId, req.body, { new: true });
        handleResponse(res, updatedReaction ? true : false, Message.updateReaction, updatedReaction || "Null");
    }),

    deleteReaction: catchAsync(async (req, res) => {
        const { reactionId } = req.params;
        const deletedReaction = await Model.Reaction.findByIdAndDelete(reactionId);
        handleResponse(res, deletedReaction ? true : false, Message.reactionDeleted, deletedReaction || "Null");
    }),
};
