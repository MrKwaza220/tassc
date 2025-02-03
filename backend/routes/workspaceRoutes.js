const express = require('express');
const { getWorkspaces, createWorkspace, deleteWorkspace } = require('../controllers/workspaceController');

const router = express.Router();

router.get('/', getWorkspaces);
router.post('/', createWorkspace);
router.delete('/:id', deleteWorkspace);

module.exports = router;
