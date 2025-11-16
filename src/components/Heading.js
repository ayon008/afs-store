'use client';

import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import rightArrowLong from '../assets/icons/arrow-right-long.svg';
import { animateText } from './animations/animateText';
import TranslateTextHover from './utils/TranslateTextHover';

export default function Heading({
  text = '',
  spanText = '',
  spanColor = 'text-white',
  spanSize = '',
  spanFontWeight = 'font-black',
  color = 'text-primary',
  size = '', // fallback to responsive
  centered = true,
  fontWeight = 'font-normal',
  breakSpan = false,
  className = '',
  isAnimate = false,
  hoverAnimation = false,
  hasArrow = false,
}) {
  const headingRef = useRef(null);
  const responsiveSize = 'text-[48px] sm:text-[60px] md:text-[75px] 2xl:text-[102px]';
  const parts = spanText ? text.split(spanText) : [text];

  useEffect(() => {
    if (isAnimate && headingRef.current) {
      const cleanup = animateText(headingRef.current);
      return cleanup;
    }
  }, [isAnimate, text]);

  const renderSpan = (txt, extraClass = '') =>
    hoverAnimation ? (
      <TranslateTextHover text={txt} className={`${extraClass}`} />
    ) : (
      <span className={extraClass}>{txt}</span>
    );

  const renderHeadingContent = () => {
    if (!spanText) {
      return renderSpan(text, color);
    }

    return (
      <>
        {parts[0] && renderSpan(parts[0], color)}

        {breakSpan ? (
          <>
            <br />
            {renderSpan(spanText, `${spanColor} ${spanSize} ${spanFontWeight} block`)}
          </>
        ) : (
          renderSpan(spanText, `${spanColor} ${spanSize} ${spanFontWeight}`)
        )}

        {parts[1] && renderSpan(parts[1], color)}
      </>
    );
  };

  return (
    <div className="relative w-full">
      {hasArrow && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <Image src={rightArrowLong} alt="Arrow" />
        </div>
      )}

      <h1
        ref={headingRef}
        className={`relative z-20 ${centered ? 'text-center' : ''} ${size || responsiveSize} ${fontWeight} ${className}`}
        style={{
          wordBreak: 'normal',
          overflowWrap: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        {renderHeadingContent()}
      </h1>
    </div>
  );
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  spanText: PropTypes.string,
  spanColor: PropTypes.string,
  spanSize: PropTypes.string,
  spanFontWeight: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  centered: PropTypes.bool,
  fontWeight: PropTypes.string,
  breakSpan: PropTypes.bool,
  className: PropTypes.string,
  isAnimate: PropTypes.bool,
  hoverAnimation: PropTypes.bool,
  hasArrow: PropTypes.bool,
};

Heading.defaultProps = {
  isAnimate: false,
  hoverAnimation: false,
  hasArrow: false,
};
