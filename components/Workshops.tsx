
import React from 'react';
import { motion } from 'framer-motion';

const workshops = [
  {
    id: 1,
    title: "MongoDB Workshop",
    image: "/assets/MongoDB.jpeg",
    alt: "MongoDB Workshop Poster"
  },
  {
    id: 2,
    title: "NVIDIA Workshop",
    image: "/assets/NVIDIA.jpeg",
    alt: "NVIDIA Workshop Poster"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const Workshops: React.FC = () => {
  return (
    <section id="workshops" className="py-24 bg-black relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-crimson/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-brand-crimson font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Hands-on Learning</span>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-6 uppercase tracking-tighter">
            Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-crimson to-brand-rose">Workshops</span>
          </h2>
          <p className="text-xl text-zinc-400">
            Get practical experience from the industry giants. Elevate your technical skills and build production-ready AI applications.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-start"
        >
          {workshops.map((workshop) => (
            <motion.div 
              key={workshop.id}
              variants={cardVariants}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src={workshop.image} 
                  alt={workshop.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
