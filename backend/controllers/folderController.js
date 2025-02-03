//controllers/folderController.js

const Folder = require('../models/Folder');
const Workspace = require('../models/Workspace');

// Create a new folder in a workspace
exports.createFolder = async (req, res) => {
  try {
    const { workspaceId, name } = req.body;

    // Check if workspace exists
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: 'Workspace not found' });

    // Create and save the folder
    const newFolder = new Folder({ name, workspace: workspaceId });
    await newFolder.save();

    // Add folder to workspace
    workspace.folders.push(newFolder._id);
    await workspace.save();

    res.status(201).json(newFolder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating folder' });
  }
};

// Delete a folder
exports.deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findByIdAndDelete(id);

    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    // Remove folder reference from workspace
    await Workspace.findByIdAndUpdate(folder.workspace, { $pull: { folders: id } });

    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting folder' });
  }
};
