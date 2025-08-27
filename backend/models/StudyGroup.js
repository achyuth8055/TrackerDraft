const mongoose = require('mongoose');

const StudyGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a group name'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// For simplicity, we'll pre-populate some groups if they don't exist.
StudyGroupSchema.statics.seed = async function() {
  const count = await this.countDocuments();
  if (count === 0) {
    console.log('Seeding initial study groups...');
    await this.create([
      { name: 'DSA-Wizards', description: 'Discussing algorithms and data structures.' },
      { name: 'System-Design-Pros', description: 'All about scalable architecture.' },
      { name: 'React-Rangers', description: 'Hooks, components, and state management.' },
    ]);
  }
};


module.exports = mongoose.model('StudyGroup', StudyGroupSchema);