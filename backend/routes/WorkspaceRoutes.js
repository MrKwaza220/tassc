const express = require('express');
const router = express.Router();
const { Workspace } = require('../models/Workspace'); // Assuming you have a Workspace model

// Create a new workspace
router.post('/workspaces', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newWorkspace = new Workspace({
      name,
      description,
      createdBy: req.user._id, // Assuming user is authenticated
    });
    await newWorkspace.save();
    res.status(201).json(newWorkspace);
  } catch (err) {
    res.status(500).json({ error: 'Error creating workspace' });
  }
});

// Fetch all workspaces for the logged-in user
router.get('/workspaces', async (req, res) => {
  try {
    const workspaces = await Workspace.find({ createdBy: req.user._id });
    res.json(workspaces);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching workspaces' });
  }
});

module.exports = router;
