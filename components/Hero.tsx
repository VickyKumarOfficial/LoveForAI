
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const SLOGANS = [
  "Where intelligence evolves",
  "Where ideas become intelligence",
  "Where curiosity meets AI"
];

export const Hero: React.FC = () => {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 2500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-crimson/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Bottom Grid Effect - 3D Perspective Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[calc(35vh+2rem)] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_top,black,transparent)] pointer-events-none [transform:perspective(1000px)_rotateX(60deg)] origin-bottom z-0"></div>


      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-semibold uppercase tracking-widest mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-crimson"></span>
          February 13-14, 2026 • KLH Aziz Nagar
        </div>
        
        <h1 className="text-6xl md:text-9xl font-display font-black tracking-tight mb-2 leading-[0.9]">
          LOVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-crimson via-brand-rose to-orange-400">FOR AI</span><br />
        </h1>

        {/* Typewriter Slogan */}
        <div className="h-12 mb-8 flex items-center justify-center">
           <div className="text-xl md:text-3xl font-medium text-white/90 flex justify-center items-baseline gap-2.5">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-crimson to-brand-rose font-bold">Where</span>
             <div className="relative h-[1.5em] overflow-hidden">
               {/* Ghost element for correct width sizing */}
               <span className="invisible whitespace-nowrap" aria-hidden="true">
                 {SLOGANS[currentSloganIndex].replace(/^Where\s*/i, '')}
               </span>
               <AnimatePresence mode="popLayout">
                 <motion.span
                   key={currentSloganIndex}
                   initial={{ y: "100%", opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: "-100%", opacity: 0 }}
                   transition={{ duration: 0.5, ease: "circOut" }}
                   className="absolute left-0 top-0 block whitespace-nowrap"
                 >
                   {SLOGANS[currentSloganIndex].replace(/^Where\s*/i, '')}
                 </motion.span>
               </AnimatePresence>
             </div>
           </div>
        </div>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 font-light leading-relaxed">
          Join the brightest minds in tech for a one-day immersion into the future of Artificial Intelligence. Experience the perfect synergy of human emotion and machine logic.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/pricing" 
            className="group relative px-8 py-4 bg-brand-crimson text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(225,29,72,0.4)]"
          >
            <span className="relative z-10">Register</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
          <a 
            href="#schedule" 
            className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
          >
            View Schedule
          </a>
        </div>
      </div>
    </section>
  );
};
