const mongoose = require("mongoose");

const ProjectTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder", // Links task to a folder
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProjectTask", ProjectTaskSchema);
