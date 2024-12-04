import React, { useState } from 'react';
import './Hero.css'; // Add custom styles here
import { Pdf } from './Pdf';
import axios from 'axios'; // Import axios for API requests

export const Hero = () => {
  const [stream, setStream] = useState('');  // Changed from field to stream
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [pdfs, setPdfs] = useState([]);

  // Subject mapping based on semester
  const subjectMapping = {
    1: ['Mathematics I', 'Physics', 'Chemistry', 'Engineering Graphics', 'Basic Electrical', 'Programming Fundamentals'],
    2: ['Mathematics II', 'Mechanics', 'Thermodynamics', 'Environmental Science', 'Data Structures', 'Digital Logic Design'],
    3: ['Mathematics III', 'Electronics', 'OOPs with Java', 'Database Management', 'Operating Systems', 'Signals and Systems'],
    4: ['Numerical Methods', 'Software Engineering', 'Computer Networks', 'Microprocessors', 'Theory of Computation', 'Artificial Intelligence'],
    5: ['Algorithm Design', 'Embedded Systems', 'Cloud Computing', 'Computer Graphics', 'Cyber Security', 'Human Values'],
    6: ['Machine Learning', 'Compiler Design', 'Data Mining', 'Wireless Networks', 'Web Technologies', 'Blockchain'],
    7: ['Big Data', 'IoT Systems', 'Advanced Algorithms', 'Cryptography', 'Robotics', 'Project Management'],
    8: ['Deep Learning', 'Quantum Computing', 'Natural Language Processing', 'AR/VR Systems', 'Entrepreneurship', 'Final Year Project'],
  };

  // Define semesters available for each year
  const semesterAvailability = {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8],
  };

  const handleFilter = async () => {
    console.log(`Filtering PDFs for ${stream} - Year ${year} - Semester ${semester} - Subject ${subject}`);

    try {
      // Fetch filtered PDFs from the backend
      const response = await axios.get('http://localhost:5000/yourRoute', {
        params: { stream, year, semester, subject }, // Send the filter parameters
      });

      if (response.data.success) {
        setPdfs(response.data.files); // Set the PDF data to the state
      } else {
        console.log('No files found for the selected filters');
        setPdfs([]);
      }
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to PYQ Sharing Platform</h1>
        <p>Select your stream, year, semester, and subject to view papers</p>

        <div className="filters">
          {/* Stream Selection */}
          <select
            value={stream}
            onChange={(e) => {
              setStream(e.target.value);
              setYear(''); // Reset other fields when stream changes
              setSemester('');
              setSubject('');
            }}
            className="filter-dropdown"
          >
            <option value="">Select Stream</option>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="ECS">Electronics (ECS)</option>
            {/* Add more streams as needed */}
          </select>

          {/* Year Selection */}
          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setSemester('');
              setSubject('');
            }}
            className="filter-dropdown"
            disabled={!stream} // Disable if stream is not selected
          >
            <option value="">Select Year</option>
            {[1, 2, 3, 4].map((yr) => (
              <option key={yr} value={yr}>
                Year {yr}
              </option>
            ))}
          </select>

          {/* Semester Selection */}
          <select
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              setSubject('');
            }}
            className="filter-dropdown"
            disabled={!year} // Disable if year is not selected
          >
            <option value="">Select Semester</option>
            {(semesterAvailability[year] || []).map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>

          {/* Subject Selection */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="filter-dropdown"
            disabled={!semester} // Disable if semester is not selected
          >
            <option value="">Select Subject</option>
            {(subjectMapping[semester] || []).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <button
            onClick={handleFilter}
            className="filter-button"
            disabled={!subject} // Disable if subject is not selected
          >
            Search
          </button>
        </div>
      </div>

      {/* PDF Display */}
      <Pdf pdfs={pdfs} />
    </div>
  );
};
