const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { signup, login } = require('../controllers/authControllers');
const Pdf = require('../models/Pdf');  // Import your PDF model

const API_KEY = 'ad953c7cfc61064a6fd791ecc39b123698254512'; // Replace with your actual API key
const drive = google.drive({ version: 'v3', auth: API_KEY });

// Folder ID for recursive retrieval
const rootFolderId = '1rE4VICJa1jYLSJCDx2DIch3downTKn7W'; // Replace with your actual folder ID

async function listFilesRecursively(folderId) {
  const files = [];

  async function fetchFiles(folderId) {
    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: 'files(id, name, mimeType)',
    });

    for (const file of response.data.files) {
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        await fetchFiles(file.id);
      } else {
        files.push({
          id: file.id,
          name: file.name,
          url: `https://drive.google.com/file/d/${file.id}/view?usp=drive_link`,
        });
      }
    }
  }

  await fetchFiles(folderId);
  return files;
}

function getPdfsFromLocal(stream, year, semester, subject) {
  // Construct the path to the specific folder where PDFs are stored
  const folderPath = path.join(__dirname, 'path/to/pdfs', stream, `year${year}`, `semester${semester}`);

  try {
    const files = fs.readdirSync(folderPath);

    const filteredFiles = files.filter(file => file.toLowerCase().includes(subject.toLowerCase()));

    const pdfFiles = filteredFiles.map(file => ({
      name: file,
      url: `/pdfs/${stream}/year${year}/semester${semester}/${file}`,
    }));

    return pdfFiles; // Return the filtered PDF data
  } catch (error) {
    console.error('Error reading PDF files:', error);
    return []; // Return an empty array if there's an error
  }
}

router.get('/yourRoute', async (req, res) => {
  const { stream, year, semester, subject } = req.query;

  // Validate input
  if (!stream || !year || !semester || !subject) {
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  try {
    const filteredPdfs = await getPdfs(stream, year, semester, subject);

    if (filteredPdfs.length > 0) {
      res.json({ success: true, files: filteredPdfs });
    } else {
      res.status(404).json({ success: false, message: 'No files found for the selected filters' });
    }
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching PDFs.',
      error: error.message,
    });
  }
});
router.post('/signup', signup);

router.post('/login', login);

module.exports = router;
