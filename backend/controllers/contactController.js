const { appendToContactSheet } = require('../services/googleSheetsService');

// @desc    Handle contact form submission
exports.submitContactForm = async (req, res) => {
  // Use the field names from the form: username, email, context
  const { username, email, context } = req.body;

  if (!username || !email || !context) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  try {
    await appendToContactSheet({ username, email, context });
    res.status(200).json({ success: true, message: 'Message received successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error, could not save message.' });
  }
};