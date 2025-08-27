const { google } = require('googleapis');
require('dotenv').config();

// This function appends a user's name upon signup
const appendToSheet = async (name) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Assumes your first sheet is for signups
    const row = [name, new Date().toLocaleString()];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:B', // Or whatever you named your signup sheet
      valueInputOption: 'USER_ENTERED',
      resource: { values: [row] },
    });
    console.log(`✅ Successfully added ${name} to Google Sheet.`);
  } catch (error) {
    console.error('❌ Error writing to Google Sheet:', error.message);
  }
};

// --- UPDATED FUNCTION for the contact form ---
const appendToContactSheet = async (contactData) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // The data to append, matching your columns: username, email, context
    const row = [
      new Date().toLocaleString(), // We'll add a timestamp in the first column
      contactData.username,
      contactData.email,
      contactData.context,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'ContactUs!A:D', // IMPORTANT: Name a sheet tab "ContactUs"
      valueInputOption: 'USER_ENTERED',
      resource: { values: [row] },
    });

    console.log(`✅ Successfully added contact from ${contactData.username} to Google Sheet.`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error writing contact to Google Sheet:', error.message);
    throw new Error('Failed to save contact to sheet.');
  }
};

module.exports = { appendToSheet, appendToContactSheet };