const express = require('express');
const router = express.Router();
const { Workspace } = require('../models/Workspace');
const { User } = require('../models/User'); // Assuming you have a User model
const { sendEmail } = require('../utils/sendEmail'); // Utility to send email

// Invite a member to a workspace
router.post('/workspaces/invite', async (req, res) => {
  const { email, workspaceId } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    // Check if the user is already a member of the workspace
    if (workspace.members.includes(user._id)) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    workspace.members.push(user._id);
    await workspace.save();

    // Optionally, send an email to the invited member
    await sendEmail(user.email, 'Workspace Invitation', 'You have been invited to join a workspace.');

    res.status(200).json({ message: 'Member invited successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error inviting member' });
  }
});

// Fetch workspace members
router.get('/workspaces/:id/members', async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id).populate('members');
    res.json(workspace.members);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching members' });
  }
});

module.exports = router;
