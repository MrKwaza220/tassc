//models/Folders.js
const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    Workspace: {type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true},
});

module.exports = mongoose.model("Folder", FolderSchema);