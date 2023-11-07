const mongoose = require('mongoose');
const { Reaction } = require('../models/index');
const catchAsync = require('../middlewares/catchAsync')
const { DB_NAME } = require('../env');
const casual = require('casual');

if (DB_NAME === "" || DB_NAME === undefined) {
    console.log("Database name not found");
    process.exit(1);
}

async function insertRandomReactions(count) {
    await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;

    db.on('error', (err) => console.error('Connection error:', err));

    await new Promise((resolve, reject) => {
        db.once('open', () => {
            console.log('Connected to the database');
            resolve();
        });
    });

    for (let i = 0; i < count; i++) {
        const newReaction = new Reaction({
            reactionBody: casual.sentence,
            username: 'RandomUser' + i,
        });

        await newReaction.save();
        console.log(`Inserted record ${i + 1}`);
    }

    mongoose.disconnect();
}
module.exports = insertRandomReactions;

// Usage example:
// const count = 10;
// insertRandomReactions(count);
