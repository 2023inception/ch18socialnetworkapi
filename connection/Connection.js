const mongoose = require('mongoose');
const express = require('express');
const allRoutes = require('../routes/index');
const errorMiddleware = require('../middlewares/errorMiddleware');
const { DB_NAME, PORT } = require('../env');

if (!DB_NAME) {
  console.log("Database name not found");
  process.exit(1);
}

const app = express();

console.log("Connecting....")

function startServer(port) {
  const server = app.listen(port, () => {
    if (server.address().port !== port) {
      console.log(`Port ${port} is already in use. Trying the next port...`);
      startServer(port + 1);
    } else {
      console.log(`Server is running on Port: ${port}`);
    }
  });
}

// Start the server
startServer(PORT);

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  app.use(express.json(), errorMiddleware, allRoutes);
});
