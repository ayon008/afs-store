// components/SizingGuideModal.jsx

import React from 'react';

// Import the sizing data from JSON file for product-specific data
let productsData = [];

try {
  // Import the complete product data with compatibility information
  productsData = require('../data/sizingGuide.json');
} catch (error) {
  console.warn('Could not load sizing guide data');
  productsData = [];
}

// Reusable Table Header component for simple two-column layout
const SimpleTableHeader = () => (
  <tr className="border-b border-gray-200 bg-white text-gray-900 text-left">
    <th className="py-4 px-6 font-medium text-base">Front wing</th>
    <th className="py-4 px-6 font-medium text-base">Program</th>
  </tr>
);
// Parse compatibility data into simple Front wing / Program format
const parseCompatibilityToSimpleFormat = (compatibilityString, productTitle) => {
  if (!compatibilityString) return [];
  
  // Handle "One size fits all" case
  if (compatibilityString.toLowerCase().includes('one size fits all')) {
    return [{ frontWing: productTitle, program: 'Universal - suitable for all conditions' }];
  }
  
  // Handle specific "Front wing / Program" format from the data
  if (compatibilityString.includes('Front wing / Program:')) {
    const programData = compatibilityString.split('Front wing / Program:')[1].trim();
    const entries = programData.split(';').map(entry => entry.trim());
    
    return entries.map(entry => {
      const parts = entry.split('(');
      if (parts.length >= 2) {
        const frontWing = parts[0].trim();
        const program = parts[1].replace(')', '').trim();
        return { frontWing, program };
      }
      return null;
    }).filter(Boolean);
  }
  
  // Handle Enduro series data
  if (compatibilityString.includes('Enduro')) {
    const entries = [];
    const enduroMatches = compatibilityString.match(/Enduro \d+[^;)]*\([^)]+\)/g);
    
    if (enduroMatches) {
      enduroMatches.forEach(match => {
        const parts = match.split('(');
        if (parts.length >= 2) {
          const frontWing = parts[0].trim();
          const program = parts[1].replace(')', '').trim();
          entries.push({ frontWing, program });
        }
      });
    }
    
    if (entries.length > 0) return entries;
  }
  
  // Handle weight-based recommendations
  if (compatibilityString.includes('kg') && (compatibilityString.includes(':') || compatibilityString.includes('('))) {
    const entries = [];
    
    // Try to extract weight and wing combinations
    const weightPattern = /([<>]?\d+(?:\/\d+)?\s*kg[^:()]*)[:\(]([^;)]+)/g;
    let match;
    
    while ((match = weightPattern.exec(compatibilityString)) !== null) {
      const weightInfo = match[1].trim();
      const wingInfo = match[2].trim();
      entries.push({ 
        frontWing: wingInfo.split(',')[0] || wingInfo, 
        program: `${weightInfo} - ${wingInfo}` 
      });
    }
    
    if (entries.length > 0) return entries;
  }
  
  // Handle simple descriptive compatibility
  return [{ frontWing: productTitle, program: compatibilityString }];
};
// Component to render sizing data in simple two-column format
const SizingContent = ({ productData }) => {
  if (!productData || !productData.compatibility) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No sizing information available for this product</p>
      </div>
    );
  }

  // Parse the compatibility data into simple format
  const simpleData = parseCompatibilityToSimpleFormat(productData.compatibility, productData.title);

  if (simpleData.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No sizing information available for this product</p>
      </div>
    );
  }

  return (
    <div>
      {/* Simple two-column table */}
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead>
            <SimpleTableHeader />
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {simpleData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-gray-900 font-medium">{row.frontWing}</td>
                <td className="py-4 px-6 text-gray-700">{row.program}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Sizing Guide Modal Component
const SizingGuideModal = ({ isOpen, onClose, productId }) => {
  if (!isOpen) return null;

  // Find the specific product data based on productId
  const productData = productsData.find(product => product.id === productId);

  return (
    // Modal Overlay (fixed, full screen, blurred background)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal Content Box */}
      <div 
        className="bg-white rounded-lg shadow-xl 
                   w-full max-w-4xl max-h-[90vh] overflow-hidden m-4 
                   transform transition-all duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 
              className="text-2xl font-bold text-gray-900"
            >
              Sizing guide
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close modal"
            >
              {/* Close Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Divider line */}
          <div 
            className="mt-4 border-t-2 border-dashed border-gray-300"
          ></div>
        </div>

        {/* Modal Body / Table Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {productData ? (
            <SizingContent productData={productData} />
          ) : (
            <div className="text-center py-8 px-6">
              <p className="text-gray-500">Product not found</p>
              <p className="text-sm text-gray-400 mt-2">
                {productId ? `Product ID: ${productId}` : 'No product ID provided'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SizingGuideModal;
