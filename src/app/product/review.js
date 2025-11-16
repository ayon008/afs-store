'use client';
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

// --- UTILITY FUNCTIONS ---
// Extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (url) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

// Process product data to extract all reviews
const extractReviews = (productData) => {
  if (!productData) return [];
  
  const reviews = [];
  
  // Review 1 (primary)
  if (productData.thumbnail_one && productData.review_title && productData.video_url) {
    reviews.push({
      id: 1,
      title: productData.review_title,
      thumbnail: productData.thumbnail_one,
      videoUrl: productData.video_url,
      productTitle: productData.title_rendered
    });
  }
  
  // Review 2
  if (productData.thumbnail_tow && productData.review_heading_tow && productData.video_url_if_has_tow) {
    reviews.push({
      id: 2,
      title: productData.review_heading_tow,
      thumbnail: productData.thumbnail_tow,
      videoUrl: productData.video_url_if_has_tow,
      productTitle: productData.title_rendered
    });
  }
  
  // Review 3
  if (productData.thumbnail_three && productData.review_heading_three && productData.video_url_if_has_three) {
    reviews.push({
      id: 3,
      title: productData.review_heading_three,
      thumbnail: productData.thumbnail_three,
      videoUrl: productData.video_url_if_has_three,
      productTitle: productData.title_rendered
    });
  }
  
  // Review 4
  if (productData.thumbnail_four && productData.review_heading_four && productData.video_url_if_has_four) {
    reviews.push({
      id: 4,
      title: productData.review_heading_four,
      thumbnail: productData.thumbnail_four,
      videoUrl: productData.video_url_if_has_four,
      productTitle: productData.title_rendered
    });
  }
  
  return reviews;
};

// --- THUMBNAIL COMPONENT ---
const Thumbnail = ({ title, active, imagePath, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex-shrink-0 w-32 h-20 mr-2 relative cursor-pointer overflow-hidden transition-all duration-200 ${
      active ? 'border-2 border-black scale-105' : 'opacity-70 hover:opacity-100'
    }`}
  >
    <img 
      src={imagePath} 
      alt={title} 
      className="w-full h-full object-cover" 
      style={{ filter: active ? 'none' : 'grayscale(100%)' }}
    />
    
    <div className="absolute bottom-0 left-0 text-white text-xs p-1 bg-black bg-opacity-50 w-full truncate">
      {title}
    </div>

    {active && (
      <div className="absolute top-1 left-1 bg-black text-white text-xs px-1 py-0.5 rounded">
        🎥
      </div>
    )}
  </div>
);


// --- MAIN REVIEWS SECTION COMPONENT ---
const ReviewsSection = ({ productData }) => {
  const reviews = useMemo(() => extractReviews(productData), [productData]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  
  // If no reviews available, don't render the section
  if (!reviews || reviews.length === 0) {
    return null;
  }
  
  const activeReview = reviews[activeReviewIndex];
  
  const handlePrevious = () => {
    setActiveReviewIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
  };
  
  const handleNext = () => {
    setActiveReviewIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
  };
  
  const handleThumbnailClick = (index) => {
    setActiveReviewIndex(index);
  };
  
  // Use thumbnail or fallback to YouTube thumbnail
  const displayThumbnail = activeReview.thumbnail || getYouTubeThumbnail(activeReview.videoUrl);
  
  // Extract product title words for overlay (first 3 words max)
  const titleWords = activeReview.productTitle?.split(' ').slice(0, 3) || ['PRODUCT', 'REVIEW'];
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Reviews</h2>
      
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
        
        {/* --- Video Player Area --- */}
        <div className="relative bg-black aspect-video">
          
          {/* Background/Video Preview Image */}
          <div 
            className="w-full h-full opacity-70 bg-cover bg-center" 
            style={{ backgroundImage: `url(${displayThumbnail})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>

          {/* Play Button Overlay */}
          <a 
            href={activeReview.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          >
            <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center opacity-80 transition group-hover:scale-110 group-hover:opacity-100">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </a>

          {/* Text Overlays */}
          <div className="absolute top-6 left-6 space-y-2">
            {titleWords.map((word, index) => (
              <span 
                key={index}
                className={`block px-4 py-1 sm:py-2 text-3xl sm:text-4xl font-extrabold tracking-wider leading-none ${
                  index === 0 ? 'bg-purple-700 text-white' : 'bg-white text-black'
                }`}
              >
                {word.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Bottom Title Bar */}
          <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-80 text-white w-full">
            <h3 className="text-lg sm:text-xl font-semibold">{activeReview.title}</h3>
            <a 
              href={activeReview.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition duration-150"
            >
              Watch the review
              <span className="ml-1 text-base leading-none">&rarr;</span>
            </a>
          </div>
        </div>

        {/* --- Thumbnail Slider Area --- */}
        {reviews.length > 1 && (
          <div className="flex items-center p-4 bg-gray-50 border-t border-gray-200">
            
            {/* Left Arrow Button */}
            <button 
              onClick={handlePrevious}
              className="p-2 mr-2 text-gray-500 hover:text-black disabled:opacity-30 transition"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Scrollable Thumbnails Container */}
            <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
              {reviews.map((review, index) => (
                <Thumbnail 
                  key={review.id} 
                  title={review.title}
                  active={index === activeReviewIndex}
                  imagePath={review.thumbnail || getYouTubeThumbnail(review.videoUrl)}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>

            {/* Right Arrow Button */}
            <button 
              onClick={handleNext}
              className="p-2 ml-2 text-gray-500 hover:text-black disabled:opacity-30 transition"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ReviewsSection;
