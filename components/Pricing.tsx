import React from 'react';
import { motion } from 'framer-motion';

// Pricing plans configuration - Free plan commented out for production
const plans = [
  // {
  //   title: "Early Bird",
  //   price: "Free",
  //   description: "Limited slots available",
  //   features: [
  //     "Full conference access",
  //     "Access to all keynotes & panels",
  //     "Networking opportunities",
  //     "Event swag & materials",
  //     "Lunch & refreshments included",
  //   ],
  //   icon: "⚡",
  //   popular: false,
  // },
  {
    title: "Standard Pass",
    price: "₹499",
    description: "Best value for students",
    features: [
      "Everything in Early Bird",
      "Workshop access (limited seats)",
      "Priority seating",
      "Digital certificate",
      "Access to speaker meet & greet",
    ],
    icon: "🎯",
    popular: true,
  },
  {
    title: "VIP Pass",
    price: "₹999",
    description: "Premium experience",
    features: [
      "Everything in Standard",
      "Front-row reserved seating",
      "1-on-1 mentor session",
      "Exclusive after-party access",
      "Premium event swag",
      "Lifetime community access",
      "Recording access (post-event)",
    ],
    icon: "👑",
    popular: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-black via-brand-black to-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-crimson/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-crimson font-bold uppercase tracking-widest text-sm mb-2 block">Pricing</span>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-white/60">
            Choose the pass that fits your experience level. All passes include full conference access.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.title}
              variants={item}
              className={`relative group ${
                plan.popular ? 'md:scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-brand-crimson text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className={`relative h-full bg-white/5 backdrop-blur-sm rounded-3xl border ${
                plan.popular ? 'border-brand-crimson/50' : 'border-white/10'
              } p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden`}>
                
                {/* Icon */}
                <div className="text-5xl mb-4">{plan.icon}</div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-white/50 text-sm ml-2">one-time</span>}
                </div>
                
                <p className="text-white/50 text-sm mb-8">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/80 text-sm">
                      <span className="text-brand-crimson mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? 'bg-brand-crimson text-white hover:bg-brand-rose shadow-lg shadow-brand-crimson/20'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}>
                  {plan.price === "Free" ? "Register Now" : "Get Started"}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/40 text-sm mt-12"
        >
          All prices are in INR. Student ID required for verification. Limited seats available.
        </motion.p>
      </div>
    </section>
  );
};
