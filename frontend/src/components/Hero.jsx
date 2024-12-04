import React, { useState } from 'react';
import './Hero.css'; // Add custom styles here

export const Hero = () => {
  const [field, setField] = useState('');
  const [semester, setSemester] = useState('');

  const handleFilter = () => {
    // Logic to fetch filtered PYQs based on field and semester
    console.log(`Filtering PYQs for ${field} - Semester ${semester}`);
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to PYQ Sharing Platform</h1>
        <p>Select your field and semester to view previous year papers</p>

        <div className="filters">
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">Select Field</option>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="ECS">Electronics (ECS)</option>
            {/* Add more fields as needed */}
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>

          <button onClick={handleFilter} className="filter-button">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
