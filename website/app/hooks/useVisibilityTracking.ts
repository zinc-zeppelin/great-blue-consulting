'use client';

import { useEffect, useRef } from 'react';
import { trackSectionView } from '../utils/analytics';

export function useVisibilityTracking(sectionName: string, threshold = 0.5) {
  const elementRef = useRef<HTMLElement>(null);
  const hasBeenViewed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed.current) {
          hasBeenViewed.current = true;
          trackSectionView(sectionName);
        }
      },
      {
        threshold,
        rootMargin: '0px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [sectionName, threshold]);

  return elementRef;
}