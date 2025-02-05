const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  folders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
});

module.exports = mongoose.model("Workspace", WorkspaceSchema);
