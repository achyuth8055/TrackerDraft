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
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// This will now create a default group if none exist
StudyGroupSchema.statics.seed = async function() {
  const count = await this.countDocuments();
  if (count === 0) {
    console.log('Seeding initial "GrowTogether" study group...');
    await this.create({ 
      name: 'GrowTogether', 
      description: 'A place for all members to connect and share knowledge.' 
    });
  }
};

module.exports = mongoose.model('StudyGroup', StudyGroupSchema);