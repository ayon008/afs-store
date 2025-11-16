import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import Link from 'next/link';

// Commitment data array
const commitments = [
  "Two year warranty on AFS products",
  "Three year warranty on AFS ADVANCED products",
  "14-day return policy",
  "Payment 2x, 3x, 4x free of charge",
  "100% secure online payment",
  "Expert customer service for board sports",
  "Trade-in, reconditioning and repair services in France",
  "Delivery anywhere in the world on request.",
];

const CommitmentItem = ({ text }) => (
  <div className="flex items-start mb-2">
    <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
    <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-4xl pt-10">

        {/* 1. Empty Cart Alert Box */}
        <div className="bg-white border p-4 rounded-md shadow-sm mb-6 max-w-3xl mx-auto md:mx-0 border-[#1d98ff]">
          <div className="flex items-center text-[#1d98ff]">
            <ShoppingCart className="w-5 h-5 mr-3 flex-shrink-0" />
            <p className="text-sm font-medium">
              Your cart is currently empty.
            </p>
          </div>
        </div>

        {/* 2. Return to Shop Button */}
        <Link href="/">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-md shadow-sm transition-colors mb-12">
            Return to shop
          </button>
        </Link>

        {/* 3. Our Commitments Card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 max-w-3xl">
          <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            Our commitments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {commitments.map((commitment, index) => (
              <CommitmentItem key={index} text={commitment} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
