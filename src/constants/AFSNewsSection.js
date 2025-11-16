"use client";

import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

// Sample data for the news articles
const newsArticles = [
  {
    id: 1,
    tag: 'BLOG',
    title: 'Discovering parawings: interview with Thomas, originally from southern Brittany',
    summary: 'Discovering parawings: interview with Thomas, originally from southern Brittany #Interview June 29, 2025 ANTONIN Table of contents About Thomas and his life by the water Q: Hello Thomas, could you briefly...',
    date: 'JULY 10, 2025',
    link: '#news-1',
  },
  {
    id: 2,
    tag: 'BLOG',
    title: 'What equipment do you need to improve your wingfoil skills?',
    summary: 'What equipment do you need to improve your wingfoil skills? Table of contents Wingfoil is a water sport that appeared on our beaches in 2019. Truly on the rise since 2021, it’s attracting more and more enthusiasts in...',
    date: 'MARCH 10, 2025',
    link: '#news-2',
  },
  {
    id: 3,
    tag: 'BLOG',
    title: 'What size foil should I choose for wingfoiling?',
    summary: '#WINGFOIL Table of contents The foil is the key component that enables the wingfoiler to fly above the water. Its size has a direct influence on lift, speed and handling. Here are a few tips to help you decipher the main...',
    date: 'MARCH 5, 2025',
    link: '#news-3',
  },
];

// Helper Component for a single News Card
const NewsCard = ({ article }) => {
  return (
    <div className="flex flex-col space-y-4 p-6 border border-gray-100 rounded-lg h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Blog Tag */}
      <span className="text-xs font-semibold tracking-wider text-blue-600 border border-blue-600 px-3 py-1 rounded-full w-fit">
        {article.tag}
      </span>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 leading-snug">
        {article.title}
      </h2>

      {/* Summary */}
      <p className="text-sm text-gray-500 line-clamp-3">
        {article.summary}
      </p>
      
      {/* Date and Read More Link */}
      <div className="mt-auto pt-4 flex justify-between items-center text-sm">
        <span className="text-gray-400 font-medium">
          {article.date}
        </span>
        <a 
          href={article.link} 
          className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
          aria-label={`Read more about ${article.title}`}
        >
          Read more
          <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
};

// Main Component: AFSNewsSection
const AFSNewsSection = () => {
  return (
    <div className="py-16 md:py-24 bg-white font-['Alliance No.2'] antialiased">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-4">
        {/* Section Header */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-12 sm:mb-16">
          News
        </h1>

        {/* Three-Column News Grid with proper gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {newsArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
        
        {/* Separator and See All Link */}
<div className="mt-20 border-t border-gray-100 pt-8 flex justify-center">
  <a
    href="#all-news"
    className="flex items-center text-sm font-semibold text-gray-900 uppercase tracking-wider hover:text-gray-700 transition-colors duration-200"
  >
    SEE ALL
    <ArrowRight
      className="w-4 h-4 ml-1 transform -rotate-15 translate-y-[-1px]"
    />
  </a>
</div>

      </div>
    </div>
  );
};

export default AFSNewsSection;
