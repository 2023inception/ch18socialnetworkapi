const mongoose = require('mongoose');
const { User } = require('../models/index');
const { DB_NAME } = require('../env');
const catchAsync = require('../middlewares/catchAsync');


if (DB_NAME === "" || DB_NAME === undefined) {
    console.log("Database name not found");
    process.exit(1);
}

async function insertRandomUsers(count) {


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

    const users = Array.from({ length: count }, (_, index) => ({
        username: `User${index + 1}`,
        email: `user${index + 1}@example.com`,
    }));

    const savedUsers = await User.insertMany(users);

    console.log(`Inserted ${count} users:`, savedUsers);

    mongoose.disconnect();
}

module.exports = insertRandomUsers;

// Usage example:
// const count = 10;
// insertRandomUsers(count);
