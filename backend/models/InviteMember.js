const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Workspace creator
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of member references
});

module.exports = mongoose.model('Workspace', workspaceSchema);
