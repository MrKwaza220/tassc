const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
router.get('/', authMiddleware, getTasks);

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post('/', authMiddleware, createTask);

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', authMiddleware, updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
