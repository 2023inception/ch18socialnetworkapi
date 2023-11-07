const express = require('express');
const router = express.Router();
const ReactionController = require('../controllers/ReactionController');

router.get('/', ReactionController.getAllReactions);

router.post('/:thoughtId/reactions', ReactionController.createReaction);

router.put('/:reactionId', ReactionController.updateReaction);

router.delete('/:thoughtId/reactions/:reactionId', ReactionController.deleteReaction);

module.exports = router;
