const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add task text'],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // --- Link to the User ---
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Task', TaskSchema);