import React from 'react';
import { X, Instagram } from 'lucide-react';

// Mock profile data
const profileData = {
  firstName: "ROBERTO",
  lastName: "ALEN",
  info: [
    { label: "COUNTRY", value: "España" },
    { label: "DATE OF BIRTH", value: "1993-09-21" },
    { label: "HOME SPOT", value: "Alloz" },
    { label: "SPORT", value: "Wingfoil" },
  ]
};

const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-gray-900/40 backdrop-blur-md">
      <div 
        className="relative flex w-full max-w-6xl h-[85vh] overflow-hidden 
                   bg-white rounded-[40px] shadow-2xl"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 rounded-full bg-white/50 backdrop-blur-sm z-50"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* LEFT COLUMN: Text */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-start">
          <div className="mb-12 mt-4">
            <h1 
              className="mb-2" 
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: "80px",
                fontWeight: 700,
                lineHeight: "80px",
                color: "rgb(17, 17, 17)"
              }}
            >
              {profileData.firstName}
            </h1>
            <h1 
              className="mb-8" 
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: "80px",
                fontWeight: 700,
                lineHeight: "80px",
                color: "rgb(29, 152, 255)"
              }}
            >
              {profileData.lastName}
            </h1>
          </div>

          <div className="space-y-6">
            {profileData.info.map((item, index) => (
              <div key={index} className="flex flex-col">
                <p 
                  style={{
                    fontFamily: '"alliance no.2", sans-serif',
                    fontSize: "35px",
                    fontWeight: 400,
                    lineHeight: "35px",
                    color: "rgba(0, 0, 0, 0.3)",
                    marginBottom: "2px"
                  }}
                >
                  {item.label}
                </p>
                <p 
                  style={{
                    fontFamily: '"alliance no.2", sans-serif',
                    fontSize: "35px",
                    fontWeight: 400,
                    lineHeight: "35px",
                    color: "rgb(0, 0, 0)"
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-12">
            <button className="text-blue-500 hover:text-blue-700">
              <Instagram className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Image */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-100 relative">
          <img 
            src="https://placehold.co/600x800/2d3748/ffffff?text=Profile+Image+Placeholder" 
            alt="Profile"
            className="w-full h-full object-cover object-center rounded-[40px]"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none rounded-[40px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
