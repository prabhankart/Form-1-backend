const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This line loads your .env file

const formRoutes = require('./routes/formRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', formRoutes);

// Get the MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the environment variables.');
    process.exit(1); // Exit the application if the database string is missing
}

// Database Connection
mongoose.connect(MONGO_URI)
    
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Connection error:', error.message);
  });