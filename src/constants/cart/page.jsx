import React, { useState } from 'react';
import { Check, ShoppingBag, Circle, Square } from 'lucide-react';
import Link from 'next/link';

// Custom component for a single step in the progress bar
const Step = ({ number, title, isCurrent, isComplete }) => {
  let circleClasses = 'w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 transition duration-300 bg-white';
  let numberColor = 'text-black';
  let titleClasses = 'mt-1 text-xs sm:text-sm transition duration-300';

  if (isCurrent) {
    circleClasses = 'w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 transition duration-300 bg-blue-500 border-blue-500 text-white font-bold';
    numberColor = 'text-white';
    titleClasses += ' font-semibold text-gray-800';
  } else {
    circleClasses += ' border-black';
    numberColor = 'text-black';
    titleClasses += ' text-gray-500';
  }

  if (isComplete && !isCurrent) {
    titleClasses = 'mt-1 text-xs sm:text-sm transition duration-300 font-semibold text-gray-800';
  }

  return (
    <div className="flex flex-col items-center relative z-10">
      <div className={circleClasses}>
        <span className={numberColor}>{number}</span>
      </div>
      <div className={titleClasses}>
        {title}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const steps = [
    { number: 1, title: 'Basket', isCurrent: true, isComplete: true },
    { number: 2, title: 'Secure payment and delivery', isCurrent: false, isComplete: false },
    { number: 3, title: 'Summary', isCurrent: false, isComplete: false },
  ];

  const commitments = [
    "Two-year warranty on AFS products",
    "Three-year warranty on AFS ADVANCED products",
    "14-day return policy",
    "Payment $2x, 3x, 4x free of charge",
    "100% secure online payment",
    "Expert customer service for board sports",
    "Trade-in, reconditioning and repair services in France",
    "Delivery anywhere in the world on request.",
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Step Indicator / Progress Bar */}
        <div className="flex items-start justify-between mb-8 sm:mb-12 relative">
          {/* Total Progress Track */}
          <div className="absolute top-3 sm:top-4 left-0 right-0 h-0.5 bg-gray-300 mx-6 sm:mx-10 md:mx-14 z-0"></div>

          {/* Completed Progress Line */}
          <div 
            className="absolute top-[11px] sm:top-[15px] left-0 h-1 bg-black mx-6 sm:mx-10 md:mx-14 z-0" 
            style={{ width: steps[0].isComplete ? '50%' : '0' }}
          ></div>

          {/* Steps */}
          <div className="flex justify-between w-full relative z-10">
            {steps.map((step, index) => (
              <Step 
                key={step.number}
                number={step.number}
                title={step.title}
                isCurrent={step.isCurrent}
                isComplete={step.isComplete}
              />
            ))}
          </div>
        </div>

        {/* Cart Empty Notification Box */}
        <div className="p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-300 bg-blue-50 rounded-lg shadow-sm w-full">
          <div className="flex items-center text-blue-800">
            <Square className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
            <span className="text-xs sm:text-sm font-medium">
              Your cart is currently empty.
            </span>
          </div>
        </div>

        {/* Return to Shop Button */}
        <Link href="/shop">
          <button
            className="px-4 sm:px-6 py-2 mb-8 sm:mb-12 text-gray-700 text-xs sm:text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-150"
          >
            Return to shop
          </button>
        </Link>

        {/* Commitments Card */}
        <div className="border border-gray-300 rounded-xl p-4 sm:p-6 md:p-8 shadow-md bg-white">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Our commitments
          </h2>
          <ul className="space-y-2">
            {commitments.map((commitment, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <Check className="w-4 h-4 text-black mt-1 flex-shrink-0" />
                <span className="ml-2 sm:ml-3 text-xs sm:text-sm leading-relaxed">
                  {commitment}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;