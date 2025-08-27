const express = require('express');
const router = express.Router();
const {
  getGroups,
  getMessagesForGroup,
  createMessage,
} = require('../controllers/studyGroupController');

const { protect } = require('../middleware/authMiddleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

// Route to get all groups
router.route('/').get(getGroups);

// Routes for a specific group's messages
router.route('/:groupId/messages')
  .get(getMessagesForGroup)
  .post(createMessage);

module.exports = router;