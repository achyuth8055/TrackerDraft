const express = require('express');
const router = express.Router();
const {
  getSubjects,
  createSubject,
  addTopic,
  addSubtopic,
  updateSubtopic,
} = require('../controllers/studyPlanController');

const { protect } = require('../middleware/authMiddleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

// Routes for subjects
router.route('/')
  .get(getSubjects)
  .post(createSubject);

// Route for adding a topic to a specific subject
router.route('/:subjectId/topics')
  .post(addTopic);

// Route for adding a subtopic to a specific topic
router.route('/:subjectId/topics/:topicId/subtopics')
  .post(addSubtopic);

// Route for updating a specific subtopic
router.route('/:subjectId/topics/:topicId/subtopics/:subtopicId')
  .put(updateSubtopic);

module.exports = router;