const Workspace = require("../models/Workspace");
const Folder = require("../models/Folder");

exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find().populate("folders");
    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;
    const newWorkspace = new Workspace({ name });
    await newWorkspace.save();
    res.status(201).json(newWorkspace);
  } catch (error) {
    res.status(500).json({ message: "Error creating workspace" });
  }
};

exports.deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    await Folder.deleteMany({ workspace: id });

    await Workspace.findByIdAndDelete(id);

    res.json({ message: "Workspace and associated folders deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workspace" });
  }
};
