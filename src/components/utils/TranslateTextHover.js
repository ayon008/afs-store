'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { getTranslateTextStyles } from '../animations/translateText';

export default function TranslateTextHover({ text, className = '', disabled = false }) {
  const [isInteracted, setIsInteracted] = useState(false);
  const styles = getTranslateTextStyles(isInteracted, disabled);

  return (
    <span
      className={`relative inline-block overflow-hidden h-[1em] leading-none ${className}`}
      onMouseEnter={() => setIsInteracted(true)}
      onMouseLeave={() => setIsInteracted(false)}
    >
      <span
        className="absolute top-0 left-0 transition-transform duration-300"
        style={styles.topText}
      >
        {text}
      </span>
      <span
        className="block transition-transform duration-300"
        style={styles.bottomText}
      >
        {text}
      </span>
    </span>
  );
}

TranslateTextHover.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
