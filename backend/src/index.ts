import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env' });
}

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/db';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

async function startServer() {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri);

    console.log('Successfully connected to MongoDB via Mongoose!');

    // Define routes and other middleware
    app.get('/', (req, res) => {
      res.send('Hello from the backend!');
    });

    // Start Express server
    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB via Mongoose:', err);
  }
}

// Start the server
startServer();