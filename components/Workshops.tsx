
import React from 'react';
import { motion } from 'framer-motion';
import mongodbImg from '../assets/mongodb-badge.png';
import nvidiaImg from '../assets/nvidia-badge.png';

const workshops = [
  {
    id: 1,
    title: "MongoDB: Architecting the Future",
    description: "Deep dive into document-based database architecture, performance optimization, and building scalable AI apps with MongoDB Atlas.",
    benefits: ["MongoDB Certification ($150 value)", "Hands-on lab sessions", "Database design patterns", "MongoDB Atlas AI integration"],
    image: mongodbImg,
    color: "from-green-500/20 to-emerald-900/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-500",
    badgeText: "$150 Certification FREE",
    featured: true
  },
  {
    id: 2,
    title: "Nvidia: GPU Accelerated AI",
    description: "Master the art of high-performance computing. Learn how to leverage CUDA and Nvidia's latest AI frameworks to build lightning-fast models.",
    benefits: ["Nvidia Certification (₹ 45288 value)", "Access to DGX cloud", "CUDA optimization techniques"],
    image: nvidiaImg,
    color: "from-brand-crimson/20 to-brand-rose/20",
    borderColor: "border-brand-crimson/30",
    iconColor: "text-brand-crimson",
    badgeText: "₹ 45288 Certification FREE",
    featured: true
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
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {workshops.map((workshop) => (
            <motion.div 
              key={workshop.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`group relative p-1 rounded-[2.5rem] bg-gradient-to-br ${workshop.color} border ${workshop.borderColor} h-full overflow-hidden transition-all duration-500`}
            >
              <div className="bg-zinc-900/90 backdrop-blur-3xl p-8 md:p-12 rounded-[2.3rem] h-full flex flex-col items-center text-center">
                {/* Image Container */}
                <div className="relative mb-8 h-32 w-full flex items-center justify-center">
                  <motion.img 
                    src={workshop.image} 
                    alt={workshop.title}
                    className="max-h-full max-w-[240px] object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  {workshop.featured && (
                    <div className="absolute -top-4 -right-4 bg-brand-crimson text-white text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-lg shadow-brand-crimson/50">
                      {workshop.badgeText}
                    </div>
                  )}
                </div>

                <h3 className="text-3xl font-display font-bold mb-4 text-white uppercase tracking-tight">
                  {workshop.id === 1 ? (
                    <>Inside <span className="text-emerald-500">MongoDB</span></>
                  ) : (
                    <>Accelerate with <span className="text-brand-crimson">Nvidia</span></>
                  )}
                </h3>
                
                <p className="text-zinc-400 mb-8 leading-relaxed italic">
                  "{workshop.description}"
                </p>

                <div className="space-y-3 w-full text-left">
                  {workshop.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${workshop.iconColor} bg-current`} />
                      <span className="text-zinc-300 text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 w-full">
                  <div className={`inline-flex items-center gap-2 font-bold uppercase tracking-widest text-xs ${workshop.iconColor} group-hover:gap-4 transition-all`}>
                    Workshop Details Coming Soon
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
