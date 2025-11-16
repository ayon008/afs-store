'use client';

import React from 'react';

const App = () => {
  const uploadedImageUrl = "https://afs-foiling.com/wp-content/uploads/2022/07/C0073.MP4.02_16-1.png";

  const paragraphText = "Foil & Co has been in existence for 6 years. We have always worked towards ecology and sustainable development, in a serious and committed way.";

  return (
    <div className="min-h-screen font-sans antialiased text-gray-800">

      {/* HERO IMAGE SECTION */}
      <section className="relative flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden">
        <div className="w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl">
          <img
            src={uploadedImageUrl}
            alt="Workshop and production environment"
            className="w-full h-full object-cover max-h-[90vh]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/1280x720/cccccc/333?text=Image+Unavailable";
            }}
          />
        </div>
      </section>

      {/* PARAGRAPH SECTION */}
      <section className="flex flex-col justify-center items-center py-8 px-6 sm:px-12">
        <div className="max-w-4xl text-center">
          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '44px',       // slightly smaller
              fontWeight: 600,
              lineHeight: '50px',     // slightly tighter
              color: 'rgb(17, 17, 17)',
            }}
          >
            {paragraphText}
          </p>
        </div>
      </section>

    </div>
  );
};

export default App;
