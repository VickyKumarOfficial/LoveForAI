
import React from 'react';
import { motion } from 'framer-motion';
import { SPEAKERS, PANEL_MEMBERS } from '../constants';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const SpeakerGrid: React.FC = () => {
  return (
    <section id="speakers" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-brand-crimson font-bold uppercase tracking-widest text-sm mb-2 block">Our Speakers</span>
          <h2 className="text-5xl font-display font-bold">Visionary Minds</h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {SPEAKERS.map((speaker) => (
            <motion.div key={speaker.id} variants={item} className="group relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src={speaker.image} 
                  alt={speaker.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="transition-all duration-300 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">{speaker.name}</h3>
                  {speaker.linkedin && (
                    <a 
                      href={speaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 hover:text-brand-crimson transition-all duration-200 transform hover:scale-110"
                      aria-label={`${speaker.name}'s LinkedIn profile`}
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-brand-crimson text-sm font-semibold mb-2">
                  {speaker.role} @ {speaker.companyUrl ? (
                    <a 
                      href={speaker.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-rose hover:underline transition-colors"
                    >
                      {speaker.company}
                    </a>
                  ) : (
                    speaker.company
                  )}
                </p>
                <p className="text-white/40 text-xs leading-relaxed">
                  {speaker.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Panel Members Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <span className="text-brand-crimson font-bold uppercase tracking-widest text-sm mb-2 block">Panel Members</span>
          <h2 className="text-4xl font-display font-bold mb-12">Industry Experts</h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {PANEL_MEMBERS.map((member) => (
            <motion.div key={member.id} variants={item} className="group relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="transition-all duration-300 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 hover:text-brand-crimson transition-all duration-200 transform hover:scale-110"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-brand-crimson text-sm font-semibold mb-2">
                  {member.role} @ {member.companyUrl ? (
                    <a 
                      href={member.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-rose hover:underline transition-colors"
                    >
                      {member.company}
                    </a>
                  ) : (
                    member.company
                  )}
                </p>
                <p className="text-white/40 text-xs leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
