const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log("CWD:", process.cwd());

// Load .env from the same directory as this file
require('dotenv').config({ path: __dirname + '/.env', override: true });

console.log(`MONGO_URI after dotenv: [${process.env.MONGO_URI}]`);

const formRoutes = require('./routes/formRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', formRoutes);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the environment variables.');
    process.exit(1);
}

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
