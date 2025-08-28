const express = require('express');
const router = express.Router();
const {
  getSubjects,
  createSubject,
  addTopic,
  addSubtopic,
  updateSubtopic,
  deleteSubject,
  deleteTopic,
  deleteSubtopic,
  addToTasks,
} = require('../controllers/studyPlanController');

const { protect } = require('../middleware/authMiddleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

// Routes for subjects
router.route('/')
  .get(getSubjects)
  .post(createSubject);

// Routes for specific subject operations
router.route('/:subjectId')
  .delete(deleteSubject);

// Route for adding a topic to a specific subject
router.route('/:subjectId/topics')
  .post(addTopic);

// Routes for specific topic operations
router.route('/:subjectId/topics/:topicId')
  .delete(deleteTopic);

// Route for adding a subtopic to a specific topic
router.route('/:subjectId/topics/:topicId/subtopics')
  .post(addSubtopic);

// Route for updating and deleting a specific subtopic
router.route('/:subjectId/topics/:topicId/subtopics/:subtopicId')
  .put(updateSubtopic)
  .delete(deleteSubtopic);

// Route for adding study plan items to daily tasks
router.route('/add-to-tasks')
  .post(addToTasks);

module.exports = router;
