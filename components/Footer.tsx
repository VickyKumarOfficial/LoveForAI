
import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/Logo.webp" 
                alt="LoveForAi" 
                className="h-14 w-auto"
              />
            </a>
            <p className="text-white/30 text-xs max-w-xs">
              The premier campus conference dedicated to the intersection of artificial intelligence and human passion.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Links</h4>
              <ul className="space-y-2 text-xs text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Social</h4>
              <ul className="space-y-2 text-xs text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/loveforai_2k26?igsh=ZmlnbHBsZWRwNGZn" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 font-medium uppercase tracking-widest">
          <p>© 2026 LoveForAi. All rights reserved.</p>
          <p>Made with ❤️ and Intelligence on Campus</p>
        </div>
      </motion.div>
    </footer>
  );
};
