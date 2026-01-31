import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use motion values for high performance updates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for position
  // High stiffness/damping to minimize 'lag' (tail effect) while keeping it smooth
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Center the cursor
      const offset = (isHovering || isDragging) ? 16 : 8;
      mouseX.set(e.clientX - offset);
      mouseY.set(e.clientY - offset);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable or interactive elements
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.getAttribute('contenteditable') === 'true' ||
        target.classList.contains('cursor-pointer') ||
        target.draggable;
        
      setIsHovering(!!isClickable);
    };
    
    const handleDragStart = () => {
      setIsDragging(true);
    };
    
    const handleDragEnd = () => {
      setIsDragging(false);
    };
    
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      // Update cursor position during drag
      const offset = 16;
      mouseX.set(e.clientX - offset);
      mouseY.set(e.clientY - offset);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);
    window.addEventListener('dragover', handleDragOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('dragend', handleDragEnd);
      window.removeEventListener('dragover', handleDragOver);
    };
  }, [isHovering, isDragging, mouseX, mouseY]);

  return (
    <>
      {/* Main Cursor Arrow */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          animate={{
            scale: isDragging ? 1.3 : (isHovering ? 1.15 : 1),
            rotate: isDragging ? 5 : 0
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            filter: isDragging ? 
              "drop-shadow(0 0 8px rgba(225, 29, 72, 0.6))" :
              "drop-shadow(0 0 4px rgba(225, 29, 72, 0.4))",
            overflow: 'visible'
          }}
        >
          <defs>
            <linearGradient id="cursor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
          <path 
            d="M2 2 L9 20 L12.5 12.5 L20 9 Z" 
            fill="url(#cursor-gradient)"
            stroke="url(#cursor-gradient)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.div>
    </>
  );
};
