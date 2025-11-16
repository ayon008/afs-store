'use client';

import { useEffect } from 'react';

export default function VhUpdater() {
  useEffect(() => {
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const updateVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    const debouncedUpdate = debounce(updateVhVariable, 150);

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', updateVhVariable);

    updateVhVariable(); // initial call

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', updateVhVariable);
    };
  }, []);

  return null; // No UI needed
}
