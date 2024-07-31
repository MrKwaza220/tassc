const express = require('express');
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

// Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      user: req.user,
      title,
      description
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
