const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { signup, login } = require('../controllers/authControllers');

// API Key and Google Drive setup
const API_KEY = 'ad953c7cfc61064a6fd791ecc39b123698254512';
const drive = google.drive({ version: 'v3', auth: API_KEY });

// Folder ID mapping based on fields, semesters, and subjects
const folderIdMapping = {
  'CSE': {
    1: {
      'Mathematics I': 'folderIdForCSE1MathematicsI',
      'Physics': 'folderIdForCSE1Physics',
      // Add other subjects for Semester 1...
    },
    2: {
      'Mathematics II': 'folderIdForCSE2MathematicsII',
      'Mechanics': 'folderIdForCSE2Mechanics',
      // Add other subjects for Semester 2...
    },
    // Add other semesters for CSE...
  },
  'ECS': {
    1: {
      'Electronics': 'folderIdForECS1Electronics',
      // Add other subjects for Semester 1...
    },
    // Add other semesters for ECS...
  },
  // Add other fields...
};

router.get('/yourRoute', (req, res) => {
    const { stream, year, semester, subject } = req.query;
  
    // For now, just logging the received query parameters
    console.log(`Received request: ${stream}, Year: ${year}, Semester: ${semester}, Subject: ${subject}`);
  
    // Respond with mock data (replace with your actual logic)
    if (stream && year && semester && subject) {
      res.json({
        success: true,
        files: [
          { name: 'sample.pdf', url: 'http://example.com/sample.pdf' },
          { name: 'example.pdf', url: 'http://example.com/example.pdf' },
        ],
      });
    } else {
      res.status(404).json({ success: false, message: 'No files found' });
    }
  });

// Route to list files from a specific folder based on field, semester, subject, and year
router.get('/files', async (req, res) => {
  const { field, semester, subject, year } = req.query;

  if (!field || !semester || !subject || !year) {
    return res.status(400).json({
      success: false,
      message: 'Field, semester, subject, and year are required.',
    });
  }

  try {
    // Check if the folderId exists for the provided field, semester, and subject
    const folderId = folderIdMapping[field]?.[semester]?.[subject];
    
    if (!folderId) {
      return res.status(404).json({
        success: false,
        message: 'No folder found for the specified combination.',
      });
    }

    // List files from the folder dynamically based on the folderId
    const response = await drive.files.list({
      q: `'${folderId}' in parents`, // Filter to only files in the specified folder
      fields: 'files(id, name, mimeType)', // Get file ID, name, and mime type
    });

    const files = response.data.files;

    if (files.length) {
      // Filter files based on the year (you can extend this logic if needed)
      const filteredFiles = files.filter(file => {
        // Example logic for filtering by year (you could adjust based on file metadata)
        const fileName = file.name;
        const fileYearMatch = fileName.includes(year);
        return fileYearMatch;
      });

      res.json({
        success: true,
        files: filteredFiles,
      });
    } else {
      res.json({
        success: false,
        message: 'No files found in this folder.',
      });
    }
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving files.',
      error: error.message,
    });
  }
});

// POST route for signup
router.post('/signup', signup);

// POST route for login
router.post('/login', login);

module.exports = router;
