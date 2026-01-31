import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const DeviceIntro = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isComplete, setIsComplete] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024; // Skip intro for widths less than 1024px
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && !isComplete) {
        setIsComplete(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isComplete]);

  if (isComplete) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden flex items-center justify-center z-[100] perspective-[2000px]">
      {/* Ambient Background Lighting */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] bg-brand-crimson/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[20%] w-[50vw] h-[50vw] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
        {/* Table Surface */}
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-[#1a1a1a] to-[#0a0a0a] border-t border-white/5" />
      </div>

      <motion.div
        className="relative z-10"
        initial={{ scale: 0.55, rotateX: 5, y: 40 }}
        animate={{
          scale: isHovered ? 1 : 0.55,
          rotateX: isHovered ? 0 : 5,
          y: isHovered ? 0 : 40
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setIsHovered(true)}
        onAnimationComplete={() => {
          if (isHovered) {
             setIsComplete(true);
          }
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Monitor Frame */}
        <div className={`relative transition-all duration-700 ${isHovered ? '' : 'shadow-2xl'}`}>
            
             {/* Main Bezel - Wrapped in motion.div for seamless resize */}
            <motion.div 
                className="bg-[#1c1c1c] relative"
                initial={{
                    padding: 12,
                    borderRadius: 16,
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 20px 50px -10px rgba(0,0,0,0.5)"
                }}
                animate={{
                    padding: isHovered ? 0 : 12,
                    borderRadius: isHovered ? 0 : 16, // px value for rounded-2xl
                    boxShadow: isHovered ? "none" : "0 0 0 1px rgba(255,255,255,0.1), 0 20px 50px -10px rgba(0,0,0,0.5)"
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
                
                {/* Screen Area */}
                <motion.div 
                     className="relative bg-black overflow-hidden overflow-y-auto"
                     initial={{
                        width: '90vw',
                        height: '80vh',
                        maxWidth: '1440px',
                        borderRadius: 8
                     }}
                     animate={{
                        width: isHovered ? '100vw' : '90vw',
                        height: isHovered ? '100vh' : '80vh',
                        maxWidth: isHovered ? '100vw' : '1440px',
                        borderRadius: isHovered ? 0 : 8 // px value for rounded-lg
                     }}
                     transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                     style={{
                        scrollbarWidth: isHovered ? 'auto' : 'none'
                     }}
                >
                    {/* The Actual App Content */}
                     <div className={`origin-top transition-all duration-700 ${isHovered ? '' : 'pointer-events-none select-none blur-[0.5px]'}`}>
                        {children}
                     </div>
                     
                     {/* Glossy Reflection */}
                     {!isHovered && (
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-50 mix-blend-overlay" />
                     )}
                </motion.div>
            </motion.div>

            {/* Monitor Stand (Only visible when zoomed out) */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 top-full"
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
                {/* Stand Neck */}
               <div className="w-32 h-16 bg-gradient-to-b from-[#1c1c1c] to-[#0f0f0f] mx-auto relative z-0 shadow-inner border-x border-white/5"></div>
               {/* Stand Base */}
               <div className="w-48 h-2 bg-[#252525] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-t border-white/10"></div>
               {/* Stand Shadow on Table */}
               <div className="w-64 h-8 bg-black/60 blur-xl absolute top-full left-1/2 -translate-x-1/2 rounded-full transform scale-y-50"></div>
            </motion.div>
        </div>
      </motion.div>

      {/* Intro Text */}
      {!isHovered && (
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-12 text-center"
         >
            {/* <p className="text-white/40 font-light tracking-[0.3em] text-xs uppercase mb-2"></p> */}
            <p className="text-white bg-white/10 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md text-sm font-medium animate-pulse">
               Hover on screen to enter
            </p>
         </motion.div>
      )}
    </div>
  );
};
