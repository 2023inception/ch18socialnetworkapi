const Model = require('../models/index');
const Messages = require('../helper/messages');
const catchAsync = require('../middlewares/catchAsync');
const { sendResponse } = require('../middlewares/response');

const handleResponse = (res, success, message, data = null) => {
    sendResponse(res, success, message, data);
};

module.exports = {
    getAllThoughts: catchAsync(async (req, res) => {
        const thoughts = await Model.Thought.find();
        handleResponse(res, thoughts ? true : false, Messages.getAllThoughts, thoughts || "Null");
    }),

    getThoughtById: catchAsync(async (req, res) => {
        const thoughtId = req.params.thoughtId;
        const thought = await Model.Thought.findById(thoughtId).populate('reactions');
        handleResponse(res, thought ? true : false, Messages.getThoughtById, thought || "Null");
    }),

    createThought: catchAsync(async (req, res) => {
        const thought = await Model.Thought.create(req.body);
        handleResponse(res, thought ? true : false, Messages.createThought, thought || "Null");
    }),

    updateThought: catchAsync(async (req, res) => {
        const thoughtId = req.params.thoughtId;
        const thought = await Model.Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
        handleResponse(res, thought ? true : false, Messages.updateThought, thought || "Null");
    }),

    deleteThought: catchAsync(async (req, res) => {
        const thoughtId = req.params.thoughtId;
        const thought = await Model.Thought.findByIdAndDelete(thoughtId);
        handleResponse(res, thought ? true : false, Messages.thoughtDeleted, "Null");
    }),

    createReaction: catchAsync(async (req, res) => {
        const thoughtId = req.params.thoughtId;
        const { reactionBody, username } = req.body;
        const thought = await Model.Thought.findById(thoughtId);
        if (!thought) {
            return handleResponse(res, false, Messages.thoughtNotFound);
        }
        const newReaction = await Model.Reaction.create({ reactionBody, username });
        thought.reactions.push(newReaction._id);
        await thought.save();
        handleResponse(res, true, Messages.reactionCreated, newReaction);
    }),
};
