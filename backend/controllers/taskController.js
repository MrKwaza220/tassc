const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newTask = new Task({
      userId: req.user.id,
      title,
      description,
      status,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, status } },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    console.log('User ID:', req.user.id);
    console.log('Task ID:', req.params.id);

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error('Error in deleteTask:', err.message);
    res.status(500).send('Server error');
  }
};


