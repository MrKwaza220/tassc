const ProjectTask = require("../models/ProjectTask");
const Folder = require("../models/Folder");

exports.createTask = async (req, res) => {
  try {
    const { folderId, name, description, status } = req.body;

    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const newTask = new ProjectTask({
      name,
      description,
      status,
      folder: folderId,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getTasksByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const tasks = await ProjectTask.find({ folder: folderId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const updatedTask = await ProjectTask.findByIdAndUpdate(
      taskId,
      updates,
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await ProjectTask.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Server error" });
  }
};
