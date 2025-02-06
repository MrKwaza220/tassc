const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  
  dueDate: {
    type: Date,
    required: true
  },
  dueTime: {
    type: String
  },
  timer: {
    type: Number
  },
  priority: {
    type: String
  },
});

module.exports = mongoose.model('Task', TaskSchema);
