const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todos');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});