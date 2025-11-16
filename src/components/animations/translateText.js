// src/animations/translateText.js
'use client';

export function getTranslateTextStyles(isInteracted, disabled) {
  return {
    topText: {
      transform: isInteracted && !disabled ? 'translateY(0)' : 'translateY(100%)',
    },
    bottomText: {
      transform: isInteracted && !disabled ? 'translateY(-100%)' : 'translateY(0)',
    },
  };
}
