const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasksByFolder,
  updateTask,
  deleteTask,
} = require("../controllers/projectTaskController");

// 📌 Create a task under a folder
router.post("/", createTask);

// 📌 Get all tasks under a folder
router.get("/:folderId", getTasksByFolder);

// 📌 Update a task
router.put("/:taskId", updateTask);

// 📌 Delete a task
router.delete("/:taskId", deleteTask);

module.exports = router;
