import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock data structure for the articles
const articles = [
  {
    title: 'How to choose the right front wing?',
    snippet: 'How to choose the right front wing? ROMAIN: Table of contents A story of gliding, and progress At AFS, we are committed to designing and manufacturing high-quality foils in France, with one goal in mind: to help...',
    date: 'JULY 28, 2025',
  },
  {
    title: 'Discovering parawings: interview with Thomas, originally from southern Brittany',
    snippet: 'Discovering parawings: interview with Thomas, originally from southern Brittany #interview June 29, 2025 ANTONIN | Table of contents About Thomas and his life by the water Q: Hello Thomas, could you briefly...',
    date: 'JULY 10, 2025',
  },
  {
    title: 'Details and dimensions Foils / Boards',
    snippet: 'Details and dimensions Foils / Boards All (0) | Foil (0) | Board (0) Previous range (0) | Foil feature – AFS Silk monoblock wing Surface area (cm2) Span (mm) Aspect Ratio Maximum cord (mm) Maximum thickness (m...',
    date: 'JUNE 16, 2025',
  },
];

// Component for a single article card
const ArticleCard = ({ article, isLast }) => (
  <div className={`p-6 md:p-8 lg:p-10 ${!isLast ? 'md:border-r border-gray-200' : ''} ${!isLast && 'border-b md:border-b-0 pb-10 md:pb-0'}`}>
    {/* Blog Badge */}
    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase text-blue-600 border border-blue-600 rounded-lg">
      BLOG
    </span>
    
    {/* Title */}
    <h3 className="text-xl font-bold leading-snug mb-4 text-black">
      {article.title}
    </h3>
    
    {/* Snippet */}
    <p className="text-sm text-gray-700 leading-relaxed mb-8">
      {article.snippet}
    </p>
    
    {/* Date and Read More Link */}
    <div className="flex justify-between items-center mt-auto">
      <span className="text-xs font-medium uppercase text-gray-500 tracking-wider">
        {article.date}
      </span>
      <Link href="/blog" className="flex items-center text-sm font-medium text-black hover:text-blue-600 transition duration-150">
        Read more
        <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  </div>
);

// Main Section Component
const ArticleSection = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
            Find out more with our articles
          </h2>
          {/* Separator Line */}
          <div className="mt-8 border-b border-gray-200"></div>
        </header>
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 md:-mx-6">
          {articles.map((article, index) => (
            <ArticleCard 
              key={index} 
              article={article} 
              // Apply border-r to all but the last card on desktop
              isLast={index === articles.length - 1}
            />
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="mt-16 pt-8 flex justify-end">
          <div className="flex space-x-4">
            {/* Left Arrow */}
            <button className="p-3 rounded-full border border-gray-300 text-gray-400 hover:text-black hover:border-black transition duration-150 shadow-md bg-white disabled:opacity-50" disabled>
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Right Arrow */}
            <button className="p-3 rounded-full border border-gray-300 text-black hover:border-black hover:shadow-lg transition duration-150 shadow-md bg-white">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArticleSection;

// Rename for the required export structure
const App = ArticleSection;
export { App };
