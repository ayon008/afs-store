'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Heading from '../heading';
import BodyText from '../BodyText';

export default function CircularProgress({ 
  isActive, 
  duration , 
  number, 
  totalCount, 
  radius = 150, 
  strokeWidth = 2,
  onComplete 
}) {
  const circleRef = useRef(null);
  const animationRef = useRef(null);

  // Auto calculations based on radius
  const circumference = 2 * Math.PI * radius;
  const size = (radius + strokeWidth) * 2;
  const center = radius + strokeWidth;

  useEffect(() => {
    // Clear any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    if (!circleRef.current) return;

    if (isActive && duration && duration > 0) {
      // Always reset to full circle first
      gsap.set(circleRef.current, { 
        strokeDashoffset: circumference,
        immediateRender: true
      });

      // Small delay to ensure reset is applied
      animationRef.current = gsap.to(circleRef.current, {
        strokeDashoffset: 0,
        duration: duration,
        ease: 'none',
        delay: 0.1,
        onComplete: () => {
          if (onComplete) {
            onComplete();
          }
        }
      });
    } else {
      // Reset when not active
      gsap.set(circleRef.current, { 
        strokeDashoffset: circumference,
        immediateRender: true
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [isActive, duration, circumference, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="absolute inset-0" width={size} height={size}>
        {/* Background Circle */}
        <circle
          r={radius}
          cx={center}
          cy={center}
          fill="none"
          stroke="#fff"
          strokeWidth={strokeWidth}
          opacity="0.2"
        />

        {/* Animated Progress Circle */}
        <circle
          ref={circleRef}
          r={radius}
          cx={center}
          cy={center}
          fill="none"
          stroke="#fff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center cursor-pointer justify-center text-white">
        <Heading
          text={number}
          size='text-[80px] lg:text-[120px]'
          className='leading-none'
          fontWeight='font-light'
          hasArrow
          hoverAnimation
        />  
        <BodyText
        text={`/ ${totalCount}`}
        color='text-white'
        size='text-2xl'
        lineHeight='leading-none'
        />
      </div>
    </div>
  );
}