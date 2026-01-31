
import React from 'react';
import { motion } from 'framer-motion';
import { ConferenceTimeline } from './ConferenceTimeline';

export const Agenda: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      id="schedule" 
      className="py-12 bg-brand-black border-y border-white/5"
    >
      <ConferenceTimeline />
    </motion.section>
  );
};
