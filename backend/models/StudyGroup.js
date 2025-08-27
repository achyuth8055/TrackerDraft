const mongoose = require('mongoose');

const StudyGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a group name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Group name cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  maxMembers: {
    type: Number,
    default: 50,
    min: [2, 'Group must allow at least 2 members'],
    max: [100, 'Group cannot exceed 100 members']
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  avatar: {
    type: String,
    default: null // URL for group image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

// Index for better performance (name index is already created by unique: true)
StudyGroupSchema.index({ isPublic: 1, createdAt: -1 });
StudyGroupSchema.index({ tags: 1 });

// Virtual for member count
StudyGroupSchema.virtual('memberCount').get(function() {
  return this.members.length;
});

// Method to add member
StudyGroupSchema.methods.addMember = function(userId) {
  if (!this.members.includes(userId) && this.members.length < this.maxMembers) {
    this.members.push(userId);
    this.lastActivity = new Date();
    return this.save();
  }
  return Promise.reject(new Error('Cannot add member'));
};

// Method to remove member
StudyGroupSchema.methods.removeMember = function(userId) {
  this.members.pull(userId);
  this.lastActivity = new Date();
  return this.save();
};

// Static method to find groups user can join
StudyGroupSchema.statics.findJoinableGroups = function(userId) {
  return this.find({
    isPublic: true,
    members: { $ne: userId },
    $expr: { $lt: [{ $size: "$members" }, "$maxMembers"] }
  }).populate('createdBy', 'name').sort('-lastActivity');
};

// Seed initial groups with the default "LetsGrowTogether" group
StudyGroupSchema.statics.seed = async function() {
  const count = await this.countDocuments();
  if (count === 0) {
    console.log('Seeding initial study groups...');
    
    // Create a system user for seeding (you might want to create a proper system user)
    const User = mongoose.model('User');
    let systemUser = await User.findOne({ email: 'system@trackr.app' });
    
    if (!systemUser) {
      systemUser = await User.create({
        name: 'System',
        email: 'system@trackr.app',
        password: 'systempassword123' // This should be hashed in production
      });
    }

    await this.create([
      { 
        name: 'LetsGrowTogether', 
        description: 'The default community for all trackr learners. Welcome!',
        createdBy: systemUser._id,
        members: [systemUser._id],
        tags: ['general', 'community', 'welcome'],
        maxMembers: 1000 // Allow many members for the default group
      },
      { 
        name: 'DSA-Wizards', 
        description: 'Discussing algorithms and data structures.',
        createdBy: systemUser._id,
        members: [systemUser._id],
        tags: ['algorithms', 'data-structures', 'coding']
      },
      { 
        name: 'System-Design-Pros', 
        description: 'All about scalable architecture.',
        createdBy: systemUser._id,
        members: [systemUser._id],
        tags: ['system-design', 'architecture', 'scalability']
      },
      { 
        name: 'React-Rangers', 
        description: 'Hooks, components, and state management.',
        createdBy: systemUser._id,
        members: [systemUser._id],
        tags: ['react', 'frontend', 'javascript']
      },
    ]);
  }
};

module.exports = mongoose.model('StudyGroup', StudyGroupSchema);
