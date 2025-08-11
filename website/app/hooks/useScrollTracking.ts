'use client';

import { useEffect, useCallback } from 'react';
import { trackScrollDepth, resetScrollTracking } from '../utils/analytics';

export function useScrollTracking() {
  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    // Calculate scroll percentage
    const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;
    
    // Track scroll depth milestones (25%, 50%, 75%, 100%)
    trackScrollDepth(scrollPercentage);
  }, []);

  useEffect(() => {
    // Reset tracking for this page
    resetScrollTracking();
    
    // Debounce scroll events
    let timeoutId: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 150);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    
    // Track initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);
}