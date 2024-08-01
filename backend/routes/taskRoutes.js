const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Get all tasks for authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error('User or user id is not defined in request object');
      return res.status(500).json({ msg: 'Server error' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }
    
    console.log('Fetching tasks for user:', req.user.id);
    const tasks = await Task.find({ user: req.user.id });
    console.log('Tasks fetched successfully:', tasks);
    res.json(tasks);
  } catch (err) {
    console.error('Server Error while fetching tasks:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, status, dueDate } = req.body;
  try {
    const newTask = new Task({
      user: req.user.id,
      name,
      description,
      status,
      dueDate
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, description, status, dueDate } = req.body;
  const taskFields = { name, description, status, dueDate };

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Ensure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });

    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Ensure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await task.remove();

    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;