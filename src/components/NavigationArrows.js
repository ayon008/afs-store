import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

export default function NavigationArrows({ onPrev, onNext, currentIndex, totalCount }) {
  const handlePrevClick = (e) => {
    console.log('Previous arrow clicked, currentIndex:', currentIndex, 'Event:', e.type);
    onPrev();
  };

  const handleNextClick = (e) => {
    console.log('Next arrow clicked, currentIndex:', currentIndex, 'Event:', e.type);
    onNext();
  };

  return (
    <div className="flex flex-row gap-2 z-50">
      <button
        onClick={handlePrevClick}
        onTouchStart={handlePrevClick}
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="Previous slide"
      >
        <FaArrowLeft className="w-6 h-6 text-black" />
      </button>
      <button
        onClick={handleNextClick}
        onTouchStart={handleNextClick}
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="Next slide"
      >
        <FaArrowRight className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}