// Import your seeding functions
const SeedUsers = require('../seeders/SeedUsers');
const SeedReactions = require('../seeders/SeedReactions');
const SeedThoughts = require('../seeders/SeedThoughts');

async function seedAll() {
    try {
        console.log('Seeding random users...');
        await SeedUsers(10);

        console.log('Seeding random reactions...');
        await SeedReactions(20);

        console.log('Seeding random thoughts...');
        await SeedThoughts(10);

        console.log('All seeding operations completed.');
    } catch (err) {
        console.error('Error:', err);
    }
}

seedAll()
