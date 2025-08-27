const mongoose = require('mongoose');

const SubtopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subtopics: [SubtopicSchema],
});

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a subject name'],
  },
  gradient: {
    type: String,
    default: 'linear-gradient(to right, var(--premium-purple), var(--premium-pink))',
  },
  topics: [TopicSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subject', SubjectSchema);