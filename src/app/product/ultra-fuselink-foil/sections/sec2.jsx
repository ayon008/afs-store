// components/GlideAtorSection.js

import React from 'react';

const GlideAtorSection = () => {
  return (
    <div className="bg-black text-white h-screen flex items-start justify-start p-8 md:p-16 lg:p-24">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-8 text-left">
          Ultra high aspect{' '}
          <span className="text-blue-500">
            #glide-ator
          </span>
          <span className="text-4xl md:text-5xl lg:text-7xl">
            {' '}
            😉
          </span>
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-12 text-left">
          {/* Left Text Column */}
          <p
            className="md:w-1/2 mb-4 md:mb-0"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '22px',
              fontWeight: 600,
              lineHeight: '26.4px',
              color: '#f5f5f5',
            }}
          >
            <strong>Ultra high aspect:</strong> AR14 – Average speeds and top speeds are exceptional. The combination of sweep, aspect ratio, and construction gives this foil a level of efficiency in passive gliding and pumping that exceeds all limits observed to date.
          </p>

          {/* Right Text Column */}
          <p
            className="md:w-1/2"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '22px',
              fontWeight: 600,
              lineHeight: '26.4px',
              color: '#f5f5f5',
            }}
          >
            The rail-to-rail has been designed to boost maneuverability and control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlideAtorSection;
