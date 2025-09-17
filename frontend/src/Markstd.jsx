import React, { useState, useEffect } from 'react';
import './Markstd.css';

const API_BASE_URL = 'https://students-page.onrender.com';

export const Markstd = () => {
  const [studentData, setStudentData] = useState(null);
  const rollno = localStorage.getItem('rollno'); // get saved roll no

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stdmark/${rollno}`);
        const data = await response.json();

        if (response.ok) {
          setStudentData(data);
        } else {
          alert(data.message || 'Error fetching data');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    };

    if (rollno) fetchData();
  }, [rollno]);

  return (
    <div className="result-page">
      <header className="result-header">
        <h1>Student Result Portal</h1>
      </header>
      <div className="result-container">
        {studentData ? (
          <div className="result-card">
            <div className="student-info">
              <h2>Student Details</h2>
              <p><strong>Roll No:</strong> {studentData.ROLL}</p>
              <p><strong>Name:</strong> {studentData.NAME}</p>
            </div>

            <table className="result-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Java Programming (JP)</td><td>{studentData.JP}</td></tr>
                <tr><td>Data Structures (DS)</td><td>{studentData.DS}</td></tr>
                <tr><td>Vector Calculus And Complex Functions (VCCF)</td><td>{studentData.VCCF}</td></tr>
                <tr><td>Design and Analysis of Algorithms (DAA)</td><td>{studentData.DAA}</td></tr>
                <tr><td>Digital Principles And Computer Organization (DPCO)</td><td>{studentData.DPCO}</td></tr>

                {/* ✅ Total */}
                <tr className="total-row">
                  <td><strong>Total</strong></td>
                  <td><strong>{studentData.total}</strong></td>
                </tr>
                <h6>No of Subject Failed : {studentData.subjects_failed}</h6>
                <h6>No of Subject Passed : {studentData.subjects_passed}</h6>
                <h6>Percentage : {studentData.percentage}</h6>
                
              </tbody>
            </table>

            <div className="result-footer">
              <p>
                Disclaimer: This is an official record. For any discrepancies,
                contact the administration.
              </p>
            </div>
          </div>
        ) : (
          <p className="loading">Loading results...</p>
        )}
      </div>
    </div>
  );
};
