const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');

// This is a public route, no 'protect' middleware needed
router.post('/', submitContactForm);

module.exports = router;