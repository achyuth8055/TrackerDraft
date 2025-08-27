const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Define the route for getting all dashboard stats
router.get('/', protect, getDashboardStats);

module.exports = router;