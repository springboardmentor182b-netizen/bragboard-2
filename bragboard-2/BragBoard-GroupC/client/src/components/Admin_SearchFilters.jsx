import React, { useState } from 'react';

const Admin_SearchFilters = () => {
  const [searchOptions, setSearchOptions] = useState({
    byDate: false,
    byDepartmentId: false,
    byTeamId: false,
    byEmployeeId: false
  });

  const handleCheckboxChange = (option) => {
    setSearchOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const searchTypes = [
    { key: 'byDate', label: 'By Date' },
    { key: 'byDepartmentId', label: 'By Department ID' },
    { key: 'byTeamId', label: 'By Team ID' },
    { key: 'byEmployeeId', label: 'By Employee ID' }
  ];

  return (
    <div className="search-filters">
      <div className="search-options">
        <h4>Search:</h4>
        <div className="options-grid">
          {searchTypes.map(option => (
            <label key={option.key} className="option-item">
              <input 
                type="checkbox" 
                checked={searchOptions[option.key]}
                onChange={() => handleCheckboxChange(option.key)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="search-results">
        <div className="results-placeholder">
          <div className="result-item">1.</div>
          <div className="result-item">2.</div>
          <div className="result-item">3.</div>
        </div>
      </div>
      
      <div className="export-section">
        <button className="export-btn">
          Export in .xlsx
        </button>
      </div>
    </div>
  );
};

export default Admin_SearchFilters;