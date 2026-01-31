import React, { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScroll: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis();

    let rafId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null; 
};
