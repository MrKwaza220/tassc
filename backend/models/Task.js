const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: 
  { 
    type: String, 
    required: true 
  },
  description: 
  {
     type: String,
     required: true 
    },
  status: 
  { 
    type: String, 
    enum: ['Progress', 'Pending', 'Completed'], 
    default: 'Pending' },
  createdDate: 
  { 
    type: Date, 
    default: Date.now },

  updatedDate: 
  { type: Date 

  },
  
  dueDate: 
  { type: Date, 
    required: true 
  }
});

module.exports = mongoose.model('Task', TaskSchema);
