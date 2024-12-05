const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { signup, login } = require('../controllers/authControllers');

const API_KEY = 'ad953c7cfc61064a6fd791ecc39b123698254512';
const drive = google.drive({ version: 'v3', auth: API_KEY });

const folderIdMapping = {
  'CSE': {
    1: {
      'Mathematics I': 'folderIdForCSE1MathematicsI',
      'Physics': 'folderIdForCSE1Physics',
    },
    2: {
      'Mathematics II': 'folderIdForCSE2MathematicsII',
      'Mechanics': 'folderIdForCSE2Mechanics',
    },
  },
  'ECS': {
    1: {
      'Electronics': 'folderIdForECS1Electronics',
    },
  },
};

router.get('/yourRoute', (req, res) => {
    const { stream, year, semester, subject } = req.query;
  
    console.log(`Received request: ${stream}, Year: ${year}, Semester: ${semester}, Subject: ${subject}`);
  
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

router.get('/files', async (req, res) => {
  const { field, semester, subject, year } = req.query;

  if (!field || !semester || !subject || !year) {
    return res.status(400).json({
      success: false,
      message: 'Field, semester, subject, and year are required.',
    });
  }

  try {
    const folderId = folderIdMapping[field]?.[semester]?.[subject];
    
    if (!folderId) {
      return res.status(404).json({
        success: false,
        message: 'No folder found for the specified combination.',
      });
    }
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
