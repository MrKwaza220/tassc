const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  const { name, description, status, dueDate } = req.body;

  try {
    const newTask = new Task({
      name,
      description,
      status,
      dueDate,
      createdDate: new Date(),
      updatedDate: new Date(),
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ msg: 'Error adding task' });
  }
});

// Fetch tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ msg: 'Error fetching tasks' });
  }
});

module.exports = router;
