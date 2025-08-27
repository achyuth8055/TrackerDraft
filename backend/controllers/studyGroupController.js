const StudyGroup = require('../models/StudyGroup');
const Message = require('../models/Message');

// @desc    Get all study groups
exports.getGroups = async (req, res) => {
  try {
    const groups = await StudyGroup.find();
    res.status(200).json({ success: true, data: groups });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all messages for a specific group
exports.getMessagesForGroup = async (req, res) => {
  try {
    const messages = await Message.find({ studyGroup: req.params.groupId })
      .populate('user', 'name'); // Populate the user's name from the User model
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new message in a group
exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create({
      text: req.body.text,
      user: req.user.id, // Comes from our 'protect' middleware
      studyGroup: req.params.groupId,
    });
    
    // Populate the user's name before sending the response back
    const populatedMessage = await Message.findById(message._id).populate('user', 'name');

    res.status(201).json({ success: true, data: populatedMessage });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};