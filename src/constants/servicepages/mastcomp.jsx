import React, { useState } from 'react';

const MastComp = () => {
  const [selectedMast, setSelectedMast] = useState('');
  const [comparisonMasts, setComparisonMasts] = useState([]);

  const mastOptions = [
    'Carbon 75cm',
    'Carbon 85cm', 
    'Carbon 95cm',
    'Aluminum 75cm',
    'Aluminum 85cm',
    'Aluminum 95cm',
    'Hybrid 75cm',
    'Hybrid 85cm',
    'Hybrid 95cm'
  ];

  const handleMastSelect = (e) => {
    const newSelections = Array.from(e.target.selectedOptions, (option) => option.value);
    
    if (newSelections.length <= 3) {
      setComparisonMasts(newSelections);
    } else {
      alert('You can only select up to 3 masts for comparison.');
      setComparisonMasts(newSelections.slice(0, 3));
    }
  };

  const handleCalculate = () => {
    console.log('Mast Comparison Request:', { selectedMast, comparisonMasts });
    alert(`Starting comparison for:\nSelected Mast: ${selectedMast || 'Not Selected'}\nComparison Masts: ${comparisonMasts.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Mast Comparison Tool
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Mast Selection */}
            <div>
              <label className="block text-lg font-semibold mb-4 text-gray-700">
                Select Primary Mast
              </label>
              <select
                value={selectedMast}
                onChange={(e) => setSelectedMast(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a mast...</option>
                {mastOptions.map((mast) => (
                  <option key={mast} value={mast}>
                    {mast}
                  </option>
                ))}
              </select>
            </div>

            {/* Comparison Masts Selection */}
            <div>
              <label className="block text-lg font-semibold mb-4 text-gray-700">
                Select Masts to Compare (max 3)
              </label>
              <select
                multiple
                value={comparisonMasts}
                onChange={handleMastSelect}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                size="6"
              >
                {mastOptions.map((mast) => (
                  <option key={mast} value={mast}>
                    {mast}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-2">
                Hold Ctrl/Cmd to select multiple masts
              </p>
            </div>
          </div>

          {/* Selected Items Display */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Selected for Comparison:</h3>
            <p><strong>Primary:</strong> {selectedMast || 'None selected'}</p>
            <p><strong>Compare with:</strong> {comparisonMasts.length > 0 ? comparisonMasts.join(', ') : 'None selected'}</p>
          </div>

          {/* Action Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleCalculate}
              disabled={!selectedMast || comparisonMasts.length === 0}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Compare Masts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MastComp;