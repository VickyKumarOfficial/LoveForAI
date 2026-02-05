import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { SmoothScroll } from '../components/SmoothScroll';

const plans = [
  {
    title: "Basic Pass",
    price: "Free",
    description: "Limited accessibility",
    features: [
      "Access to stalls",
    ],
    icon: "",
    popular: false,
  },
  {
    title: "Standard Pass",
    price: "₹99",
    description: "Best value for day 1 or 2 pass only",
    features: [
      "Access for either day 1 or day 2",
      "Workshop access",
      "Access to stalls",
      "Digital certificate",
      "Access to speaker meet & greet",
    ],
    icon: "",
    popular: false,
  },
  {
    title: "VIP Pass",
    price: "₹149",
    description: "Premium experience - 2 days",
    features: [
      "Everything in Standard",
      "Front-row reserved seating",
      "1-on-1 mentor session",
      "Exclusive after-party access",
      "Premium event swag",
      "Lifetime community access",
      "Recording access (post-event)",
    ],
    icon: "",
    popular: true,
  },
];

const PricingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment'>('details');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    transactionId: ''
  });

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setPaymentStep('details');
    setFormData(prev => ({ ...prev, transactionId: '' }));
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If it's a paid plan and we are still in details step, move to payment step
    if (selectedPlan.price !== 'Free' && paymentStep === 'details') {
      setPaymentStep('payment');
      return;
    }

    setIsLoading(true);

    try {
      // Check for duplicate registration by email or phone
      const { data: existingRegistrations, error: checkError } = await supabase
        .from('registrations')
        .select('email, phone, name')
        .or(`email.eq.${formData.email},phone.eq.${formData.phone}`);

      if (checkError) throw checkError;

      if (existingRegistrations && existingRegistrations.length > 0) {
        const duplicate = existingRegistrations[0];
        const duplicateField = duplicate.email === formData.email ? 'email' : 'phone number';
        setErrorMessage(`Registration failed! This ${duplicateField} is already registered under the name "${duplicate.name}".`);
        setIsLoading(false);
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }

      // Prepare registration data
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        year: formData.year,
        plan_title: selectedPlan.title,
        plan_price: selectedPlan.price,
        payment_status: selectedPlan.price === 'Free' ? 'free' : 'pending_verification',
        transaction_id: selectedPlan.price === 'Free' ? null : formData.transactionId,
      };

      // Create registration in Supabase
      // Email will be automatically sent via Supabase Database Webhook
      const { error } = await supabase
        .from('registrations')
        .insert([registrationData]);

      if (error) throw error;

      // Show success message
      setShowSuccess(true);
      
      // Close modal and reset after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        closeModal();
        setFormData({ name: '', email: '', phone: '', college: '', year: '', transactionId: '' });
        setPaymentStep('details');
      }, 3000);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrorMessage(error.message || 'Registration failed. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <div className="min-h-screen bg-black text-white">
        <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-crimson/20 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-display font-black mb-6 uppercase leading-tight tracking-tighter">
              Choose Your <span className="text-brand-crimson">Experience</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Select the perfect pass for your AI conference journey at KL University
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-crimson" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-crimson" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant Confirmation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

        {/* Limited Time Offer Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-crimson via-brand-rose to-orange-500 p-1">
              <div className="bg-black rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-crimson/20 via-transparent to-brand-crimson/20 animate-pulse" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-crimson/20 border border-brand-crimson text-brand-crimson text-xs font-bold uppercase tracking-wider mb-4">
                    <span className="w-2 h-2 rounded-full bg-brand-crimson animate-pulse"></span>
                    Limited Time Offer
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-display font-black uppercase mb-4 leading-tight">
                    First <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-crimson via-brand-rose to-orange-400">5 Registrations</span> FREE!
                  </h3>
                  
                  <p className="text-lg md:text-xl text-zinc-300 mb-6 max-w-2xl mx-auto">
                    Be among the first 5 to register and get <span className="text-brand-crimson font-bold">complete VIP access</span> to all 2-day conference activities, workshops, exclusive sessions, and premium perks — absolutely FREE!
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-brand-crimson" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>All VIP Benefits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-brand-crimson" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>2 Full Days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-brand-crimson" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Premium Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-brand-crimson" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>No Cost</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

      {/* Pricing Cards */}
      <section id="pricing" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 0.4,
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={`relative flex flex-col h-full rounded-3xl p-8 border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-brand-crimson/20 to-transparent border-brand-crimson shadow-2xl shadow-brand-crimson/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-crimson text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-display font-black uppercase mb-2">{plan.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-5xl font-black">{plan.price}</span>
                    {plan.price === "₹99" && <span className="text-zinc-500 mb-2">/1 Day</span>}
                    {plan.price === "₹149" && <span className="text-zinc-500 mb-2">/2 Days</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`mt-auto w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                    plan.popular
                      ? 'bg-brand-crimson text-white hover:bg-brand-crimson/90 shadow-lg shadow-brand-crimson/30'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  Get {plan.title}
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Kit & Goodies Notice Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-crimson/20 border border-brand-crimson flex items-center justify-center">
                    <svg className="w-6 h-6 text-brand-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">Conference Kit & Goodies</h4>
                  <p className="text-zinc-400 text-sm">
                    Payment will be collected <span className="text-brand-crimson font-semibold">on the spot</span> at the venue
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pt-24"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 z-30 flex items-center justify-center bg-zinc-900/95 backdrop-blur-sm"
                  >
                    <div className="text-center p-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
                      >
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                      <p className="text-zinc-400">
                        {selectedPlan?.price === 'Free' 
                          ? 'Registration successful! Check your email for confirmation.'
                          : 'Payment details submitted! We will verify your transaction and confirm your registration shortly.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-0 right-0 z-30 m-6"
                  >
                    <div className="bg-red-500/90 border-2 border-red-400 rounded-2xl p-5 shadow-2xl shadow-red-500/50 backdrop-blur-md">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-black text-white mb-2 uppercase tracking-wide">Registration Error</h4>
                          <p className="text-sm font-medium text-white/95 leading-relaxed">{errorMessage}</p>
                        </div>
                        <button
                          onClick={() => setErrorMessage('')}
                          className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Modal Header */}
              <div className="relative p-8 pb-6 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-crimson/10 to-transparent" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-crimson/20 border border-brand-crimson/50 text-brand-crimson text-xs font-bold uppercase tracking-wider mb-4">
                    {selectedPlan?.title}
                  </div>
                  <h2 className="text-3xl font-display font-black uppercase mb-2">
                    Complete Your Registration
                  </h2>
                  <p className="text-zinc-400">
                    Fill in your details to secure your spot at LoveForAI Conference 2026
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {paymentStep === 'details' ? (
                  <>
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                        Full Name <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-crimson transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                        Email Address <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-crimson transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                        Phone Number <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-crimson transition-colors"
                        placeholder="10-digit mobile number"
                      />
                    </div>

                    {/* College */}
                    <div>
                      <label htmlFor="college" className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                        College/Institution <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-crimson transition-colors"
                        placeholder="Your college or institution name"
                      />
                    </div>

                    {/* Year */}
                    <div>
                      <label htmlFor="year" className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                        Year of Study <span className="text-brand-crimson">*</span>
                      </label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-crimson transition-colors"
                      >
                        <option value="" className="bg-zinc-900">Select your year</option>
                        <option value="1st Year" className="bg-zinc-900">1st Year</option>
                        <option value="2nd Year" className="bg-zinc-900">2nd Year</option>
                        <option value="3rd Year" className="bg-zinc-900">3rd Year</option>
                        <option value="4th Year" className="bg-zinc-900">4th Year</option>
                        <option value="Graduate" className="bg-zinc-900">Graduate</option>
                        <option value="Professional" className="bg-zinc-900">Professional</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6 text-center">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <p className="text-sm text-zinc-400 mb-4 uppercase tracking-widest">Scan to Pay</p>
                      <div className="bg-white p-2 w-52 h-52 mx-auto rounded-xl">
                        <img 
                          src="/assets/QR.jpg" 
                          alt="UPI QR Code" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-2xl font-black text-brand-crimson mt-4">{selectedPlan?.price}</p>
                      <p className="text-sm text-zinc-500 mt-1">Scan via GPay, PhonePe, Paytm</p>
                    </div>

                    <div className="text-left">
                      <label htmlFor="transactionId" className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                        Transaction ID / UTR Number <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        id="transactionId"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        required={selectedPlan?.price !== 'Free'}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-crimson transition-colors"
                        placeholder="Enter 12-digit UPI Reference Number"
                      />
                      <p className="text-xs text-zinc-500 mt-2">
                        * Please verify the UTR number before submitting. Incorrect details may lead to registration cancellation.
                      </p>
                    </div>
                  </div>
                )}

                {/* Selected Plan Info */}
                <div className="p-4 bg-gradient-to-r from-brand-crimson/10 to-transparent border border-brand-crimson/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Selected Plan</p>
                      <p className="text-xl font-bold">{selectedPlan?.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-zinc-400 mb-1">Amount</p>
                      <p className="text-2xl font-black text-brand-crimson">{selectedPlan?.price}</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (paymentStep === 'payment') {
                        setPaymentStep('details');
                      } else {
                        closeModal();
                      }
                    }}
                    disabled={isLoading}
                    className="flex-1 py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold uppercase tracking-wider text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {paymentStep === 'payment' ? 'Back' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-6 bg-brand-crimson hover:bg-brand-crimson/90 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-brand-crimson/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      selectedPlan?.price === 'Free' 
                        ? 'Complete Registration' 
                        : (paymentStep === 'details' ? 'Proceed to Payment' : 'Confirm Payment')
                    )}
                  </button>
                </div>
              </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PricingPage;
