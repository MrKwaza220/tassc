const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, default: 'Pending' },
  dueDate: Date,
  priority: { type: String, default: 'Medium' },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }, // Reference to workspace
  // Other fields
});

module.exports = mongoose.model('Task', taskSchema);
