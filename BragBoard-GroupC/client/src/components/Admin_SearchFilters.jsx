import React, { useState } from 'react';
import { Search, FileText } from 'lucide-react';

const SearchFilters = () => {
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
    { key: 'byDate', label: 'By Date Range' },
    { key: 'byDepartmentId', label: 'By Department ID' },
    { key: 'byTeamId', label: 'By Team ID' },
    { key: 'byEmployeeId', label: 'By Employee ID' }
  ];
  
  const handleExport = () => {
    console.log("Simulating export of search results to .xlsx.");
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-3xl font-bold text-gray-800">Advanced Report Search</h3>
        <p className="text-gray-500 mt-1">Filter and export shoutout data based on specific criteria.</p>
      </div>
      
      <div className="search-options p-6 border border-blue-100 rounded-lg bg-blue-50">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Select Search Criteria</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {searchTypes.map(option => (
            <label key={option.key} className="flex items-center space-x-2 cursor-pointer transition-colors p-2 rounded-lg hover:bg-white">
              <input 
                type="checkbox" 
                checked={searchOptions[option.key]}
                onChange={() => handleCheckboxChange(option.key)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4 items-end">
            {Object.entries(searchOptions).map(([key, isChecked]) => (
                isChecked && (
                    <input
                        key={key}
                        type={key === 'byDate' ? 'date' : 'text'}
                        placeholder={`Enter value for ${searchTypes.find(t => t.key === key).label}`}
                        className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                    />
                )
            ))}
            <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-semibold md:w-auto w-full">
                <Search className="w-5 h-5 mr-2" />
                Run Search
            </button>
        </div>
      </div>
      
      <div className="search-results pt-4 border-t border-gray-100">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Search Results (Latest 3)</h4>
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="p-3 bg-white rounded-md shadow-sm border border-gray-100 text-gray-700 font-medium">1. Shoutout ID: 105 - Great work on Project X. (Marketing Dept)</div>
          <div className="p-3 bg-white rounded-md shadow-sm border border-gray-100 text-gray-700 font-medium">2. Shoutout ID: 112 - Team collaboration success. (Development Team B)</div>
          <div className="p-3 bg-white rounded-md shadow-sm border border-gray-100 text-gray-700 font-medium">3. Shoutout ID: 109 - Exceeded Q3 metrics. (Sales Dept)</div>
          <p className="text-sm text-gray-500 pt-2">Showing 3 of 42 results...</p>
        </div>
      </div>
      
      <div className="export-section flex justify-end pt-4 border-t border-gray-200">
        <button 
          onClick={handleExport}
          className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-xl"
        >
          <FileText className="w-5 h-5 mr-2" />
          Export All Results (.xlsx)
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;