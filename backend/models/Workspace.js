//models/Workspace.js
const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    folders: [{type: mongoose.Schema.Types.ObjectId, ref: "Folder"}],
});

module.exports = mongoose.model("Workspace", workspaceSchema);
