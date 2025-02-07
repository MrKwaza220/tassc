const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasksByFolder,
  updateTask,
  deleteTask,
} = require("../controllers/projectTaskController");

router.post("/", createTask);

router.get("/:folderId", getTasksByFolder);

router.put("/:taskId", updateTask);

router.delete("/:taskId", deleteTask);

module.exports = router;
