const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add message text'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  studyGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyGroup',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', MessageSchema);