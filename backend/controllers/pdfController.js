const Pdf = require("../models/Pdf");

// Create a new PDF entry
const createPdf = async (req, res) => {
  try {
    const { stream, year, semester, subject, filename, fileUrl } = req.body;

    // Create a new PDF instance
    const newPdf = new Pdf({
      stream,
      year,
      semester,
      subject,
      filename,
      fileUrl,
    });

    // Save the new PDF to the database
    await newPdf.save();

    res.status(201).json({
      success: true,
      message: 'PDF created successfully',
      pdf: newPdf,
    });
  } catch (error) {
    console.error('Error creating PDF:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the PDF',
      error: error.message,
    });
  }
};

// Get all PDFs with optional query parameters for filtering
const getPdfs = async (req, res) => {
  try {
    const { stream, year, semester, subject } = req.query;

    // Build the query object
    const query = {};
    if (stream) query.stream = stream;
    if (year) query.year = year;
    if (semester) query.semester = semester;
    if (subject) query.subject = new RegExp(subject, 'i'); // Case-insensitive match for subject

    // Find PDFs that match the query
    const pdfs = await Pdf.find(query);

    if (pdfs.length > 0) {
      res.json({
        success: true,
        pdfs,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No PDFs found with the given filters',
      });
    }
  } catch (error) {
    console.error('Error retrieving PDFs:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the PDFs',
      error: error.message,
    });
  }
};

// Get a specific PDF by ID
const getPdfById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the PDF by its ID
    const pdf = await Pdf.findById(id);

    if (pdf) {
      res.json({
        success: true,
        pdf,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'PDF not found',
      });
    }
  } catch (error) {
    console.error('Error retrieving PDF:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the PDF',
      error: error.message,
    });
  }
};

// Update a specific PDF by ID
const updatePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const { stream, year, semester, subject, filename, fileUrl } = req.body;

    // Find and update the PDF by ID
    const updatedPdf = await Pdf.findByIdAndUpdate(
      id,
      { stream, year, semester, subject, filename, fileUrl },
      { new: true }
    );

    if (updatedPdf) {
      res.json({
        success: true,
        message: 'PDF updated successfully',
        pdf: updatedPdf,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'PDF not found',
      });
    }
  } catch (error) {
    console.error('Error updating PDF:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the PDF',
      error: error.message,
    });
  }
};

// Delete a specific PDF by ID
const deletePdf = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the PDF by ID
    const deletedPdf = await Pdf.findByIdAndDelete(id);

    if (deletedPdf) {
      res.json({
        success: true,
        message: 'PDF deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'PDF not found',
      });
    }
  } catch (error) {
    console.error('Error deleting PDF:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the PDF',
      error: error.message,
    });
  }
};

module.exports = {
  createPdf,
  getPdfs,
  getPdfById,
  updatePdf,
  deletePdf,
};
