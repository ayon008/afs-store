'use client';

import React, { useState } from 'react';

const filters = ['ALL', 'BOARD', 'FOIL', 'PACK', 'WING'];

const App = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const FilterItem = ({ name }) => {
    const isActive = name === activeFilter;
    const baseClasses = 'cursor-pointer transition duration-150 ease-in-out uppercase tracking-wider text-sm p-2 hover:text-gray-800';
    const activeClasses = 'text-gray-900 font-semibold border-b-2 border-gray-900';
    const inactiveClasses = 'text-gray-500 font-medium';
    
    return (
      <div 
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        onClick={() => setActiveFilter(name)}
      >
        {name}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 h-[10vh] flex justify-center w-full items-center">
      <div className="flex justify-center items-center space-x-8 md:space-x-10">
        {filters.map(filter => (
          <FilterItem key={filter} name={filter} />
        ))}
      </div>
    </div>
  );
};

export default App;
