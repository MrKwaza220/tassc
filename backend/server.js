const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const config = require('config'); // Make sure this is included
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Simple route to send a message to the browser
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
