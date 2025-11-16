"use client";

import React, { useState } from "react";
import CustomerCard from "./card";
import Popup from "./popup"; // Import the Popup component

const Sec2 = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  
  const cardsData = [
    {
      title: "Card 1 Title",
      description: "Description for card 1. This is a placeholder description to demonstrate the card component.",
      image: "/images/blogs/blog-1.jpg",
    },
    {
      title: "Card 2 Title",
      description: "Description for card 2. This is a placeholder description to demonstrate the card component.",
      image: "/images/blogs/blog-2.jpg",
    },
    {
      title: "Card 3 Title",
      description: "Description for card 3. This is a placeholder description to demonstrate the card component.",
      image: "/images/blogs/blog-3.jpg",
    },
    {
      title: "Card 4 Title",
      description: "Description for card 4. This is a placeholder description to demonstrate the card component.",
      image: "/images/blogs/blog-4.jpg",
    },
    {
      title: "Card 5 Title",
      description: "Description for card 5. This is a placeholder description to demonstrate the card component.",
      image: "/images/blogs/blog-5.jpg",
    },
    {
      title: "Card 6 Title",
      description: "Description for card 6. This is a placeholder description to demonstrate the card component.",
      image: "/images/blogs/blog-6.jpg",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-[1800px] mx-auto px-6">

        {/* Grid layout with responsive columns and proper spacing */}
        <div className="grid place-items-center gap-x-8 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center">
          {cardsData.map((card, index) => (
            <CustomerCard
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              onViewAll={() => setSelectedCard(card)}
            />
          ))}
        </div>
      </div>

      {/* Render the Popup component when a card is selected */}
      {selectedCard && <Popup isOpen={true} onClose={() => setSelectedCard(null)} />}
    </section>
  );
};

export default Sec2;
