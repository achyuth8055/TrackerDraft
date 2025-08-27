const express = require('express');
const router = express.Router();
const {
  getGroups,
  getGroupById,
  createGroup,
  joinGroup,
  leaveGroup,
  getMessagesForGroup,
  createMessage,
} = require('../controllers/studyGroupController');

const { protect } = require('../middleware/authMiddleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

// Group routes
router.route('/')
  .get(getGroups)        // GET /api/groups - Get all groups or filtered groups
  .post(createGroup);    // POST /api/groups - Create a new group

// Specific group routes
router.route('/:id')
  .get(getGroupById);    // GET /api/groups/:id - Get specific group details

// Group membership routes
router.route('/:id/join')
  .post(joinGroup);      // POST /api/groups/:id/join - Join a group

router.route('/:id/leave')
  .post(leaveGroup);     // POST /api/groups/:id/leave - Leave a group

// Group message routes
router.route('/:groupId/messages')
  .get(getMessagesForGroup)    // GET /api/groups/:groupId/messages - Get all messages
  .post(createMessage);        // POST /api/groups/:groupId/messages - Send a message

module.exports = router;