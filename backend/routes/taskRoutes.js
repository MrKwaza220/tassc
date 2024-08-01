const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Get all tasks for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
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
