const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  stream: String,
  year: Number,
  semester: Number,
  subject: String,
  filename: String,
  fileUrl: String, // URL to the stored PDF
});

const Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = Pdf;
