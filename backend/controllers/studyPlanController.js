const Subject = require('../models/StudyPlan');

// --- SUBJECTS ---

// @desc    Get all subjects for the logged-in user
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: subjects });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new subject
exports.createSubject = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const subject = await Subject.create(req.body);
    res.status(201).json({ success: true, data: subject });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// --- TOPICS ---

// @desc    Add a new topic to a subject
exports.addTopic = async (req, res) => {
    try {
        const subject = await Subject.findOne({ _id: req.params.subjectId, userId: req.user.id });
        if (!subject) {
            return res.status(404).json({ success: false, error: 'Subject not found or user not authorized' });
        }
        subject.topics.push({ name: req.body.name, subtopics: [] });
        await subject.save();
        res.status(200).json({ success: true, data: subject });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// --- SUBTOPICS ---

// @desc    Add a new subtopic to a topic
exports.addSubtopic = async (req, res) => {
    try {
        const subject = await Subject.findOne({ _id: req.params.subjectId, userId: req.user.id });
        if (!subject) {
            return res.status(404).json({ success: false, error: 'Subject not found' });
        }
        const topic = subject.topics.id(req.params.topicId);
        if (!topic) {
            return res.status(404).json({ success: false, error: 'Topic not found' });
        }
        topic.subtopics.push({ name: req.body.name });
        await subject.save();
        res.status(200).json({ success: true, data: subject });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update a subtopic (e.g., toggle completion)
exports.updateSubtopic = async (req, res) => {
    try {
        const subject = await Subject.findOne({ _id: req.params.subjectId, userId: req.user.id });
        if (!subject) {
            return res.status(404).json({ success: false, error: 'Subject not found' });
        }
        const topic = subject.topics.id(req.params.topicId);
        if (!topic) {
            return res.status(404).json({ success: false, error: 'Topic not found' });
        }
        const subtopic = topic.subtopics.id(req.params.subtopicId);
        if (!subtopic) {
            return res.status(404).json({ success: false, error: 'Subtopic not found' });
        }
        subtopic.completed = req.body.completed;
        await subject.save();
        res.status(200).json({ success: true, data: subject });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};