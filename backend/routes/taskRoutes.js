const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Import the protection middleware
const { protect } = require('../middleware/authMiddleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(createTask);

router
  .route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;