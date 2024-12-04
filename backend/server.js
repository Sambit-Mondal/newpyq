const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
require('dotenv').config();  // Correct way to load environment variables using dotenv

const app = express();

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', authRoutes);

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
