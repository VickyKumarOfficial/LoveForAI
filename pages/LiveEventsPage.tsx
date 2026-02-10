import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';

interface LiveEvent {
  id: number;
  title: string;
  image: string;
  alt: string;
}

const liveEvents: LiveEvent[] = [
  {
    id: 1,
    title: "Ather Event",
    image: "/assets/Atherevent.jpeg",
    alt: "Ather Event Poster"
  },
  {
    id: 2,
    title: "Candel Event",
    image: "/assets/candel.jpeg",
    alt: "Candel Event Poster"
  },
  {
    id: 3,
    title: "BMW Event",
    image: "/assets/BMW.jpeg",
    alt: "BMW Event Poster"
  },
  {
    id: 4,
    title: "POT Event",
    image: "/assets/pot.jpeg",
    alt: "POT Event Poster"
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

const LiveEventsPage: React.FC = () => {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-brand-black text-white">
        <Navbar />
        
        {/* Visual background noise/texture */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] overflow-hidden">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <main className="pt-32 pb-24">
          <section className="py-24 bg-black relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-crimson/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-crimson/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto mb-20"
              >
                <span className="text-brand-crimson font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Experience Live</span>
                <h1 className="text-5xl md:text-6xl font-display font-black mb-6 uppercase tracking-tighter">
                  Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-crimson to-brand-rose">Events</span>
                </h1>
                <p className="text-xl text-zinc-400">
                  Join us for exciting live events featuring amazing partners and experiences.
                </p>
              </motion.div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
              >
                {liveEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    variants={cardVariants}
                    className="group relative"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-white/20">
                      <img 
                        src={event.image} 
                        alt={event.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LiveEventsPage;
