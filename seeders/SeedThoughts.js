const mongoose = require('mongoose');
const { Thought } = require('../models/index');
const { DB_NAME } = require('../env');
const catchAsync = require('../middlewares/catchAsync');

if (DB_NAME === "" || DB_NAME === undefined) {
    console.log("Database name not found");
    process.exit(1);
}

async function insertRandomThoughts(count) {
    await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', (err) => console.log('Connection error:', err));

    await new Promise((resolve, reject) => {
        db.once('open', () => {
            console.log('Connected to the database');
            resolve();
        });
    });

    const thoughts = Array.from({ length: count }, (_, i) => ({
        thoughtText: `Thought ${i}`,
        username: `User${i}`,
    }));

    const savedThoughts = await Thought.insertMany(thoughts);

    console.log(`Inserted ${count} thoughts:`, savedThoughts);

    mongoose.disconnect();
}

module.exports = insertRandomThoughts;

// Usage example:
// const count = 10;
// insertRandomThoughts(count);
