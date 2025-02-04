//routes//folderRoutes.js
const express = require('express');
const { createFolder, deleteFolder } = require('../controllers/folderController');

const router = express.Router();

router.post('/', createFolder);
router.delete('/:id', deleteFolder);

module.exports = router;
