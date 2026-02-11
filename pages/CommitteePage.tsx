import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';

interface CommitteeMember {
  name: string;
  role: string;
  image: string;
}

// Save portraits under public/assets/committee/<slugified-name>.webp to auto-connect them here.
const portrait = (name: string) => `/assets/committee/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.webp`;

const TECHNICAL_COMMITTEE: CommitteeMember[] = [
  {
    name: 'Gowtham',
    role: 'Technical Head',
    image: portrait('Gowtham'),
  },
  {
    name: 'Bhuvanesh',
    role: 'Technical Co-Head',
    image: portrait('Bhuvanesh'),
  },
  {
    name: 'Varun',
    role: 'Sponsers',
    image: '/assets/committee/varun.webp',
  },
  {
    name: 'Varshitha',
    role: 'Sponsers ',
    image: portrait('Varshitha'),
  },
  {
    name: 'Ananya',
    role: 'Sponsers',
    image: '/assets/committee/Ananya.webp',
  },
  // {
  //   name: 'Nuha',
  //   role: 'Event Management & Panels/Talks/Workshop',
  //   image: portrait('Nuha'),
  // },
  {
    name: 'Amrutha',
    role: 'Event Management',
    image: portrait('Amrutha'),
  },
  {
    name: 'Eajaz',
    role: 'Panels/Talks/Workshop',
    image: portrait('Eajaz'),
  },
  {
    name: 'Akshaj',
    role: 'Panels/Talks/Workshop',
    image: portrait('Akshaj'),
  },
  {
    name: 'Nicky',
    role: 'Web Dev',
    image: portrait('Nicky'),
  },
  {
    name: 'Smruti',
    role: 'Web Dev',
    image: portrait('Smruti'),
  },
  {
    name: 'Dwarkesh',
    role: 'Web Dev',
    image: '/assets/committee/Dwarkesh.webp',
  }
];
const CULTURAL_COMMITTEE: CommitteeMember[] = [
  {
    name: 'Jathin',
    role: 'Cultural Head',
    image: portrait('Jathin'),
  },
  {
    name: 'Hridya',
    role: 'Cultural Co-Head',
    image: portrait('Hridya'),
  },
  {
    name: 'Sriya',
    role: 'Movie / Films & Designing',
    image: portrait('Sriya'),
  },
  {
    name: 'Smruti',
    role: 'Movie / Films',
    image: portrait('Smruti'),
  },
  {
    name: 'Ritish',
    role: 'Movie / Films',
    image: '/assets/committee/Ritesh.webp',
  },
  {
    name: 'Sahasra',
    role: 'Event Management',
    image: portrait('Sahasra'),
  },
  {
    name: 'B Pavan Kumar Reddy',
    role: 'Event Management',
    image: portrait('pavan'),
  },
  // {
  //   name: 'Nuha',
  //   role: 'Event Management',
  //   image: portrait('Nuha'),
  // },
  {
    name: 'Amrutha',
    role: 'Designing',
    image: portrait('Amrutha'),
  },
  {
    name: 'Shiva',
    role: 'Designing',
    image: portrait('Shiva'),
  },
  // {
  //   name: 'Kyathi',
  //   role: 'Designing',
  //   image: portrait('Kyathi'),
  // },
];

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

const CommitteePage: React.FC = () => {
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
          <section className="py-24 bg-black relative">
            <div className="container mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4"
              >
                <div>
                  <span className="text-brand-crimson font-bold uppercase tracking-widest text-sm mb-2 block">Technical Committee</span>
                  <h1 className="text-5xl font-display font-bold">Core Team</h1>
                </div>
                
              </motion.div>

              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {TECHNICAL_COMMITTEE.map((member) => (
                  <motion.div key={member.name} variants={item} className="group relative">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-white/20">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    </div>
                    
                    <div className="transition-all duration-300 group-hover:translate-x-2">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-brand-crimson text-sm font-semibold mb-2">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
          <section className="py-24 bg-black relative">
            <div className="container mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4"
              >
                <div>
                  <span className="text-brand-crimson font-bold uppercase tracking-widest text-sm mb-2 block">Cultural Committee</span>
                  <h1 className="text-5xl font-display font-bold">Core Team</h1>
                </div>
                
              </motion.div>

              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {CULTURAL_COMMITTEE.map((member) => (
                  <motion.div key={member.name} variants={item} className="group relative">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-white/20">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    </div>
                    
                    <div className="transition-all duration-300 group-hover:translate-x-2">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-brand-crimson text-sm font-semibold mb-2">
                        {member.role}
                      </p>
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

export default CommitteePage;
