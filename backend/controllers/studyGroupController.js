const StudyGroup = require('../models/StudyGroup');
const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get all study groups or user's groups
// @route   GET /api/groups
// @access  Private
exports.getGroups = async (req, res) => {
  try {
    const { type } = req.query;
    let groups;

    if (type === 'joined') {
      // Get groups where user is a member
      groups = await StudyGroup.find({ members: req.user.id })
        .populate('createdBy', 'name')
        .populate('members', 'name email')
        .sort('-lastActivity');
    } else if (type === 'available') {
      // Get groups user can join
      groups = await StudyGroup.findJoinableGroups(req.user.id);
    } else {
      // Get all public groups
      groups = await StudyGroup.find({ isPublic: true })
        .populate('createdBy', 'name')
        .select('-members') // Don't include full member list for privacy
        .sort('-lastActivity');
    }

    res.status(200).json({ success: true, data: groups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get a specific study group with details
// @route   GET /api/groups/:id
// @access  Private
exports.getGroupById = async (req, res) => {
  try {
    const group = await StudyGroup.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('members', 'name email');

    if (!group) {
      return res.status(404).json({ success: false, error: 'Group not found' });
    }

    // Check if user is a member or if group is public
    const isMember = group.members.some(member => member._id.toString() === req.user.id);
    const isPublic = group.isPublic;

    if (!isMember && !isPublic) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    res.status(200).json({ success: true, data: group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new study group
// @route   POST /api/groups
// @access  Private
exports.createGroup = async (req, res) => {
  try {
    const { name, description, isPublic = true, maxMembers = 50, tags = [] } = req.body;

    // Check if group name already exists
    const existingGroup = await StudyGroup.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existingGroup) {
      return res.status(400).json({ 
        success: false, 
        error: 'A group with this name already exists' 
      });
    }

    const group = await StudyGroup.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id], // Creator is automatically a member
      isPublic,
      maxMembers,
      tags: Array.isArray(tags) ? tags : [tags].filter(Boolean)
    });

    // Populate the created group
    await group.populate('createdBy', 'name');
    await group.populate('members', 'name email');

    res.status(201).json({ success: true, data: group });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ success: false, error: errors.join(', ') });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Join a study group
// @route   POST /api/groups/:id/join
// @access  Private
exports.joinGroup = async (req, res) => {
  try {
    const group = await StudyGroup.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ success: false, error: 'Group not found' });
    }

    if (!group.isPublic) {
      return res.status(403).json({ success: false, error: 'This is a private group' });
    }

    if (group.members.includes(req.user.id)) {
      return res.status(400).json({ success: false, error: 'You are already a member of this group' });
    }

    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({ success: false, error: 'This group is at maximum capacity' });
    }

    // Add user to group
    await group.addMember(req.user.id);
    
    // Populate and return updated group
    await group.populate('createdBy', 'name');
    await group.populate('members', 'name email');

    res.status(200).json({ success: true, data: group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Leave a study group
// @route   POST /api/groups/:id/leave
// @access  Private
exports.leaveGroup = async (req, res) => {
  try {
    const group = await StudyGroup.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ success: false, error: 'Group not found' });
    }

    if (!group.members.includes(req.user.id)) {
      return res.status(400).json({ success: false, error: 'You are not a member of this group' });
    }

    if (group.createdBy.toString() === req.user.id && group.members.length > 1) {
      return res.status(400).json({ 
        success: false, 
        error: 'Group creators cannot leave unless they transfer ownership or the group is empty' 
      });
    }

    // Remove user from group
    await group.removeMember(req.user.id);

    // If group is now empty, delete it
    if (group.members.length === 0) {
      await StudyGroup.findByIdAndDelete(req.params.id);
      await Message.deleteMany({ studyGroup: req.params.id });
    }

    res.status(200).json({ success: true, message: 'Successfully left the group' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all messages for a specific group
// @route   GET /api/groups/:groupId/messages
// @access  Private
exports.getMessagesForGroup = async (req, res) => {
  try {
    // First, check if user is a member of the group
    const group = await StudyGroup.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ success: false, error: 'Group not found' });
    }

    if (!group.members.includes(req.user.id) && !group.isPublic) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    const messages = await Message.find({ studyGroup: req.params.groupId })
      .populate('user', 'name')
      .sort({ createdAt: 1 })
      .limit(100); // Limit to last 100 messages

    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new message in a group
// @route   POST /api/groups/:groupId/messages
// @access  Private
exports.createMessage = async (req, res) => {
  try {
    // Check if user is a member of the group
    const group = await StudyGroup.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ success: false, error: 'Group not found' });
    }

    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ success: false, error: 'You must be a member to send messages' });
    }

    const message = await Message.create({
      text: req.body.text,
      user: req.user.id,
      studyGroup: req.params.groupId,
    });
    
    // Update group's last activity
    group.lastActivity = new Date();
    await group.save();

    // Populate the user's name before sending the response back
    const populatedMessage = await Message.findById(message._id).populate('user', 'name');

    res.status(201).json({ success: true, data: populatedMessage });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Auto-join user to "LetsGrowTogether" group (used during registration)
// @access  Private (called internally)
exports.autoJoinDefaultGroup = async (userId) => {
  try {
    let defaultGroup = await StudyGroup.findOne({ name: 'LetsGrowTogether' });
    
    // Create the group if it doesn't exist
    if (!defaultGroup) {
      // First try to find a system user, or use the new user as creator
      const User = require('../models/User');
      let systemUser = await User.findOne({ email: 'system@trackr.app' });
      
      if (!systemUser) {
        systemUser = { _id: userId }; // Use the new user as creator
      }

      defaultGroup = await StudyGroup.create({
        name: 'LetsGrowTogether',
        description: 'The default community for all trackr learners. Welcome!',
        createdBy: systemUser._id,
        members: [systemUser._id],
        tags: ['general', 'community', 'welcome'],
        maxMembers: 1000,
        isPublic: true
      });
    }

    // Add user to the default group if they're not already a member
    if (!defaultGroup.members.includes(userId)) {
      await defaultGroup.addMember(userId);
    }

    return defaultGroup;
  } catch (error) {
    console.error('Error auto-joining default group:', error);
    return null;
  }
};