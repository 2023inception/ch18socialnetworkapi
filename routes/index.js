const router = require('express').Router();
const thought = require('./ThoughtsRoutes');
const reactionRoutes = require('./ReactionsRoutes');
const userRoutes = require('./UsersRoutes');

router.use('/users', userRoutes);

router.use('/thoughts', thought);

router.use('/reactions', reactionRoutes);

module.exports = router;
