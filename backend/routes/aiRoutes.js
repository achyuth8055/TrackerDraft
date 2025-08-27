const express = require('express');
const router = express.Router();
const { handleAskAI } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');


router.post('/ask', protect, handleAskAI);

module.exports = router;