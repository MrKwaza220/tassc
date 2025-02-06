const ProjectTask = require("../models/ProjectTask");
const Folder = require("../models/Folder");

// 📌 Create a new task under a folder
exports.createTask = async (req, res) => {
  try {
    const { folderId, name, description, status } = req.body;

    // Check if folder exists
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    // Create a new task
    const newTask = new ProjectTask({
      name,
      description,
      status,
      folder: folderId,
    });

    // Save task to database
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Get all tasks under a specific folder
exports.getTasksByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    // Fetch tasks for the folder
    const tasks = await ProjectTask.find({ folder: folderId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Update a task (name, description, status)
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    // Find and update task
    const updatedTask = await ProjectTask.findByIdAndUpdate(
      taskId,
      updates,
      { new: true } // Return updated task
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

// 📌 Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find and delete task
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
