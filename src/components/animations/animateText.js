import gsap from 'gsap';

export const animateText = (element, trigger = true) => {
  if (!element) return;

  // Set initial visibility to hidden to prevent static text flash
  gsap.set(element, { visibility: 'hidden' });

  // Split text into words, then each word into characters
  const splitTextIntoWords = (text) => {
    return text.split(/\s+/).map((word) => (
      `<span class="word inline-block">${word.split('').map((char) => (
        `<span class="inline-block">${char === ' ' ? '\u00A0' : char}</span>`
      )).join('')} </span>`
    )).join('');
  };

  // Apply splitting to all text nodes within spans
  const spans = element.querySelectorAll('span');
  spans.forEach((span) => {
    span.innerHTML = splitTextIntoWords(span.textContent);
  });

  // Select all character spans
  const charSpans = element.querySelectorAll('.word span');

  // Set initial state for animation
  gsap.set(charSpans, { y: 50, opacity: 0 });

  // Add CSS to ensure proper word spacing and wrapping
  const style = document.createElement('style');
  style.textContent = `
    .word {
      white-space: nowrap;
    }
    .word > span {
      display: inline-block;
    }
  `;
  document.head.appendChild(style);

  // Create IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Make element visible before animating
          gsap.set(element, { visibility: 'visible' });
          // Animate each character
          gsap.to(charSpans, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (trigger) {
    observer.observe(element);
  }

  // Return cleanup function
  return () => {
    observer.disconnect();
    style.remove();
    gsap.set(element, { visibility: 'visible' }); // Reset visibility on cleanup
  };
};