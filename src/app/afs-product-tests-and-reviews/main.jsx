"use client";

import React from 'react';
import Card from './cards';

const MainPage = () => {
  // Create an array of 4 items to render 4 cards
  const cards = Array(4).fill(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((_, index) => (
          <div key={index} className="w-full">
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
