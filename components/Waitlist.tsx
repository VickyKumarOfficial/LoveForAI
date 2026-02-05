
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Logic for registration
    }
  };

  return (
    <section id="register" className="py-24 bg-brand-crimson relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-black/20 rounded-full blur-[60px]"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {!isSubmitted ? (
          <div className="max-w-2xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-display font-black text-white mb-6"
            >
              JOIN THE WAITLIST
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/80 mb-10 text-lg"
            >
              Registration is free but limited. Enter your college ID email to receive your exclusive NFC-enabled invite.
            </motion.p>
            
            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-2xl"
            >
              <input 
                type="email" 
                required
                placeholder="college.email@edu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="grow px-6 py-4 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-brand-crimson/20 font-medium"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors"
              >
                Register
              </button>
            </motion.form>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto py-12 bg-white rounded-3xl shadow-2xl text-black"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black mb-2 uppercase">You're in!</h3>
            <p className="text-zinc-500 mb-6 px-8">Check your inbox. We've sent a confirmation to <br/><span className="font-bold text-black">{email}</span></p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-brand-crimson font-bold hover:underline"
            >
              Add another?
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
