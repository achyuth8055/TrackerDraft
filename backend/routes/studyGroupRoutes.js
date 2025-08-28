const express = require('express');
const router = express.Router();
const {
  getMyGroups,
  createGroup,
  findGroups,
  joinGroup,
  getMessagesForGroup,
  createMessage,
} = require('../controllers/studyGroupController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// Routes for managing groups the user is in
router.route('/')
  .get(getMyGroups)
  .post(createGroup);

// Route for discovering new groups to join
router.route('/find').get(findGroups);

// Route for joining a specific group
router.route('/:groupId/join').post(joinGroup);

// Routes for messages within a specific group
router.route('/:groupId/messages')
  .get(getMessagesForGroup)
  .post(createMessage);

module.exports = router;