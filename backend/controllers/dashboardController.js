const Task = require('../models/Task');
const Subject = require('../models/StudyPlan');

// @desc    Get all dashboard stats for the logged-in user
exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Get Task Summary
    const completedTasks = await Task.countDocuments({ userId: req.user.id, completed: true });
    const upcomingTasks = await Task.countDocuments({ userId: req.user.id, completed: false });

    // 2. Get Subject Progress
    const subjects = await Subject.find({ userId: req.user.id });
    const subjectProgress = subjects.map(subject => {
      const totalSubtopics = subject.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0);
      if (totalSubtopics === 0) {
        return { name: subject.name, progress: 0, gradient: subject.gradient };
      }
      const completedSubtopics = subject.topics.reduce((acc, topic) =>
        acc + topic.subtopics.filter(st => st.completed).length, 0);
      
      const progress = Math.round((completedSubtopics / totalSubtopics) * 100);
      return { name: subject.name, progress, gradient: subject.gradient };
    });

    // 3. Combine all stats into one object
    const stats = {
      taskSummary: {
        completed: completedTasks,
        upcoming: upcomingTasks,
      },
      subjectProgress: subjectProgress,
    };

    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};