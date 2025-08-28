const StudyGroup = require('../models/StudyGroup');
const Message = require('../models/Message');

// @desc    Get all groups the current user is a member of
exports.getMyGroups = async (req, res) => {
  try {
    const groups = await StudyGroup.find({ members: req.user.id });
    res.status(200).json({ success: true, data: groups });
  } catch (err) { res.status(500).json({ success: false, error: 'Server Error' }); }
};

// @desc    Create a new study group
exports.createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const group = await StudyGroup.create({
      name,
      description,
      members: [req.user.id] // Creator is the first member
    });
    res.status(201).json({ success: true, data: group });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

// @desc    Find groups to join (that the user is not already in)
exports.findGroups = async (req, res) => {
    try {
        const groups = await StudyGroup.find({ members: { $ne: req.user.id } });
        res.status(200).json({ success: true, data: groups });
    } catch (err) { res.status(500).json({ success: false, error: 'Server Error' }); }
};

// @desc    Join a study group
exports.joinGroup = async (req, res) => {
    try {
        const group = await StudyGroup.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ success: false, error: 'Group not found' });
        }
        // Add user to members array if not already present
        if (!group.members.includes(req.user.id)) {
            group.members.push(req.user.id);
            await group.save();
        }
        res.status(200).json({ success: true, data: group });
    } catch (err) { res.status(500).json({ success: false, error: 'Server Error' }); }
};

// @desc    Get all messages for a specific group
exports.getMessagesForGroup = async (req, res) => {
  try {
    const messages = await Message.find({ studyGroup: req.params.groupId })
      .populate('user', 'name');
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
      user: req.user.id,
      studyGroup: req.params.groupId,
    });
    
    const populatedMessage = await Message.findById(message._id).populate('user', 'name');
    res.status(201).json({ success: true, data: populatedMessage });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};