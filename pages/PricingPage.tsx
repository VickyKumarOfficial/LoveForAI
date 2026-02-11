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
    title: "Free - Cultural Event",
    price: "Free",
    description: "Free access to cultural events only",
    features: [
      "Access to cultural events",
      "Access to stalls",
      "Event swag & materials",
      "Networking opportunities",
      "No technical event access",
    ],
    icon: "🎭",
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
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState('');
  const [utrError, setUtrError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    transactionId: '',
    selectedDay: ''
  });

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setPaymentStep('details');
    setFormData(prev => ({ ...prev, transactionId: '', selectedDay: '' }));
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please upload an image file (JPG, PNG, etc.)');
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Screenshot must be less than 5MB');
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }
      setScreenshotFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setScreenshotPreview(previewUrl);
    }
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
      setScreenshotPreview(null);
    }
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

  // ── Phone number validation ──
  const validatePhone = (phone: string): string => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) return 'Phone number must be exactly 10 digits.';
    if (!/^[6-9]/.test(digits)) return 'Indian mobile numbers start with 6, 7, 8 or 9.';
    if (/^(\d)\1{9}$/.test(digits)) return 'Invalid phone number (all same digits).';
    if (/^(0123456789|1234567890|9876543210|0987654321)$/.test(digits)) return 'Invalid phone number (sequential digits).';
    if (/^(\d)\1{4,}/.test(digits) || /(\d)\1{4,}$/.test(digits)) return 'Phone number looks invalid (too many repeated digits).';
    // Alternating pair pattern: 9898989898, 7171717171, etc.
    if (/^(\d\d)\1{4}$/.test(digits)) return 'Invalid phone number (repeating pattern).';
    // Ascending from start digit: 6789012345, 7890123456, 8901234567, 9012345678
    const ascending = '0123456789012345';
    if (ascending.includes(digits)) return 'Invalid phone number (sequential digits).';
    // Descending from start digit
    const descending = '9876543210987654';
    if (descending.includes(digits)) return 'Invalid phone number (sequential digits).';
    return '';
  };

  // ── UTR / Transaction ID validation ──
  const FAKE_WORDS = /^(test|testing|fake|dummy|sample|abcd|abcdef|xyz|none|na|nil|null|random|asdf|qwerty|asdfgh|password|pay|paid|done|ok|hello|hi)$/i;
  const validateUTR = (utr: string): string => {
    if (!utr) return '';
    const trimmed = utr.trim();
    if (trimmed.length < 8) return 'Transaction ID is too short (minimum 8 characters).';
    if (trimmed.length > 25) return 'Transaction ID is too long (maximum 25 characters).';
    if (!/^[A-Za-z0-9]+$/.test(trimmed)) return 'Transaction ID must contain only letters and numbers.';
    // All same character
    if (/^(.)\1+$/.test(trimmed)) return 'Invalid Transaction ID (all same characters).';
    // Common fake words / test values
    if (FAKE_WORDS.test(trimmed)) return 'Please enter your real Transaction ID, not a placeholder.';
    // Keyboard smash patterns
    if (/^(qwerty|asdfgh|zxcvbn)/i.test(trimmed)) return 'Invalid Transaction ID (keyboard pattern).';
    // Sequential digits (ascending or descending)
    if (/^0?1234567890/.test(trimmed) || /^9876543210/.test(trimmed)) return 'Invalid Transaction ID (sequential pattern).';
    // Repeating short pair/triplet patterns: 121212121212, abababababab, 123123123123
    if (/^(.{1,3})\1{3,}$/.test(trimmed)) return 'Invalid Transaction ID (repeating pattern).';
    // All zeros
    if (/^0+$/.test(trimmed)) return 'Invalid Transaction ID.';
    // UPI UTRs are typically 12 digits; NEFT/IMPS can be 16-22 alphanumeric
    const isAllDigits = /^\d+$/.test(trimmed);
    if (isAllDigits && ![12, 16, 22].includes(trimmed.length) && trimmed.length < 8) return 'Numeric Transaction IDs are usually 12 digits (UPI) or 16+ digits (bank transfer).';
    // Purely alphabetic is suspicious for a UTR
    if (/^[A-Za-z]+$/.test(trimmed)) return 'Transaction IDs usually contain numbers. Please check your UTR.';
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'phone') {
      setPhoneError(validatePhone(value.replace(/\D/g, '')));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits, max 10
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: raw });
    setPhoneError(validatePhone(raw));
  };

  const handleTransactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');  // strip spaces
    setFormData({ ...formData, transactionId: value });
    setUtrError(validateUTR(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If it's a paid plan and we are still in details step, move to payment step
    if (selectedPlan.price !== 'Free' && paymentStep === 'details') {
      // Validate day selection for Standard Pass
      if (selectedPlan.title === 'Standard Pass' && !formData.selectedDay) {
        setErrorMessage('Please select which day you want to attend.');
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }
      setPaymentStep('payment');
      return;
    }

    // ── Validate phone number at submit time ──
    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) {
      setPhoneError(phoneErr);
      setErrorMessage(phoneErr);
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    // Validate UTR/Transaction ID is not empty for paid plans
    if (selectedPlan.price !== 'Free' && !formData.transactionId.trim()) {
      setErrorMessage('Please enter your UTR/Transaction ID.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    // ── Validate UTR pattern at submit time ──
    if (selectedPlan.price !== 'Free') {
      const utrErr = validateUTR(formData.transactionId);
      if (utrErr) {
        setUtrError(utrErr);
        setErrorMessage(utrErr);
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }
    }

    // Validate screenshot is uploaded for paid plans
    if (selectedPlan.price !== 'Free' && !screenshotFile) {
      setErrorMessage('Please upload a screenshot of your payment.');
      setTimeout(() => setErrorMessage(''), 5000);
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

      // Check for duplicate UTR / Transaction ID (same UTR used by someone else = likely fake)
      if (selectedPlan.price !== 'Free' && formData.transactionId.trim()) {
        const { data: existingUTR, error: utrCheckError } = await supabase
          .from('registrations')
          .select('name, transaction_id')
          .eq('transaction_id', formData.transactionId.trim())
          .limit(1);

        if (!utrCheckError && existingUTR && existingUTR.length > 0) {
          setUtrError('This Transaction ID has already been used.');
          setErrorMessage(`This Transaction ID is already used by another registration. Please enter your own unique UTR.`);
          setIsLoading(false);
          setTimeout(() => setErrorMessage(''), 5000);
          return;
        }
      }

      // Upload screenshot to Supabase Storage if it's a paid plan
      let screenshotUrl = null;
      if (selectedPlan.price !== 'Free' && screenshotFile) {
        const fileExt = screenshotFile.name.split('.').pop();
        const fileName = `${formData.phone}_${formData.transactionId}_${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('payment-screenshots')
          .upload(fileName, screenshotFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw new Error('Failed to upload screenshot. Please try again.');
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('payment-screenshots')
          .getPublicUrl(fileName);
        
        screenshotUrl = urlData.publicUrl;
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
        screenshot_url: screenshotUrl,
        selected_day: selectedPlan.title === 'Standard Pass' ? formData.selectedDay : null,
      };

      // Create registration in Supabase
      // Email will be automatically sent via Supabase Database Webhook
      const { error } = await supabase
        .from('registrations')
        .insert([registrationData]);

      if (error) throw error;

      // Show success message (no auto-close, user will close manually)
      setShowSuccess(true);
      
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
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
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

          {/* Gaming Events Registration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-display font-black uppercase mb-2 text-white">Gaming Tournaments</h3>
              <p className="text-zinc-400">Register for our exciting esports competitions</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Fire Showdown */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="relative flex flex-col h-full rounded-3xl p-8 border bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <div className="text-center mb-8">
                  <div className="mb-4 flex justify-center">
                    <img src="/assets/freefire.png" alt="Free Fire" className="w-24 h-24 object-contain" />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase mb-2">Free Fire Showdown</h3>
                  <p className="text-zinc-400 text-sm mb-6">Day 1 - Gaming Tournament</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-5xl font-black text-brand-crimson">₹50</span>
                    <span className="text-zinc-500 mb-2">/player</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-300">10:00 AM - 12:15 PM</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-300">Competitive gaming tournament</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-300">Exciting prizes and rewards</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-300">Team-based competition</span>
                  </li>
                </ul>

                <a
                  href="https://forms.gle/VVjWrrmdUJN8kZBy6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 bg-brand-crimson text-white hover:bg-brand-crimson/90 shadow-lg shadow-brand-crimson/30 text-center"
                >
                  Register Now
                </a>
              </motion.div>

              {/* Battleground Blitz */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="relative flex flex-col h-full rounded-3xl p-8 border bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <div className="text-center mb-8">
                  <div className="mb-4 flex justify-center">
                    <img src="/assets/Battleground.png" alt="Battleground" className="w-24 h-24 object-contain" />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase mb-2">Battleground Blitz</h3>
                  <p className="text-zinc-400 text-sm mb-6">Day 2 - Esports Showcase</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-5xl font-black text-brand-crimson">₹70</span>
                    <span className="text-zinc-500 mb-2">/player</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-300">10:00 AM - 12:15 PM</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-300">Professional esports competition</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-300">Amazing prizes for winners</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-300">Strategic team gameplay</span>
                  </li>
                </ul>

                <a
                  href="https://forms.gle/VVjWrrmdUJN8kZBy6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 bg-brand-crimson text-white hover:bg-brand-crimson/90 shadow-lg shadow-brand-crimson/30 text-center"
                >
                  Register Now
                </a>
              </motion.div>
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
                    className="absolute inset-0 z-30 flex items-center justify-center bg-zinc-900/95 backdrop-blur-sm overflow-y-auto"
                  >
                    <div className="text-center p-6 sm:p-8 max-w-md mx-auto">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
                      >
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Success!</h3>
                      <p className="text-sm sm:text-base text-zinc-400 mb-6">
                        {selectedPlan?.price === 'Free' 
                          ? 'Registration successful! Check your email for confirmation.'
                          : 'Payment details submitted! We will verify your transaction and confirm your registration shortly.'}
                      </p>
                      
                      {/* Telegram Group Join Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 p-4 sm:p-6 bg-gradient-to-br from-brand-crimson/10 to-transparent border border-brand-crimson/30 rounded-2xl"
                      >
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-brand-crimson" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                          <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">Join Our Community</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-400 mb-4">
                          Scan the QR code or click the button below to join our Telegram group for the latest updates!
                        </p>
                        <div className="bg-white p-2 w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-xl mb-4">
                          <img 
                            src="/assets/telegramgrp.png" 
                            alt="Telegram Group QR Code" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <a
                          href="https://t.me/+mzc0ek8zAzs5ZTVl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-brand-crimson hover:bg-brand-crimson/90 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all shadow-lg shadow-brand-crimson/30"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                          Join Telegram Group
                        </a>
                        <button
                          onClick={() => {
                            setShowSuccess(false);
                            closeModal();
                            setFormData({ name: '', email: '', phone: '', college: '', year: '', transactionId: '', selectedDay: '' });
                            setPhoneError('');
                            setUtrError('');
                            setScreenshotFile(null);
                            setScreenshotPreview(null);
                            setPaymentStep('details');
                          }}
                          className="mt-4 w-full py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all"
                        >
                          Close Window
                        </button>
                      </motion.div>
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
                        onChange={handlePhoneChange}
                        required
                        maxLength={10}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                          phoneError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-crimson'
                        }`}
                        placeholder="10-digit mobile number"
                      />
                      {phoneError && (
                        <p className="text-xs text-red-400 mt-1">{phoneError}</p>
                      )}
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

                    {/* Day Selection - Only for Standard Pass */}
                    {selectedPlan?.title === 'Standard Pass' && (
                      <div>
                        <label htmlFor="selectedDay" className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                          Select Day <span className="text-brand-crimson">*</span>
                        </label>
                        <select
                          id="selectedDay"
                          name="selectedDay"
                          value={formData.selectedDay}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-crimson transition-colors"
                        >
                          <option value="" className="bg-zinc-900">Choose your preferred day</option>
                          <option value="Day 1 - Feb 13" className="bg-zinc-900">Day 1 - February 13th, 2026</option>
                          <option value="Day 2 - Feb 14" className="bg-zinc-900">Day 2 - February 14th, 2026</option>
                        </select>
                        <p className="text-xs text-zinc-500 mt-2">
                          Standard Pass allows access for one day only. Choose which day you'd like to attend.
                        </p>
                      </div>
                    )}
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
                         Transaction ID <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        id="transactionId"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleTransactionIdChange}
                        required={selectedPlan?.price !== 'Free'}
                        maxLength={25}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                          utrError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-crimson'
                        }`}
                        placeholder="Enter your 12-digit UPI UTR number"
                      />
                      {utrError && (
                        <p className="text-xs text-red-400 mt-1">{utrError}</p>
                      )}
                      <p className="text-xs text-zinc-500 mt-2">
                        Enter the Transaction ID from your payment app's transaction history.
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        *NOTE: Incorrect Transaction ID may lead to registration cancellation.
                      </p>
                    </div>

                    {/* Payment Screenshot Upload */}
                    <div className="text-left">
                      <label className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                        Payment Screenshot <span className="text-brand-crimson">*</span>
                      </label>
                      
                      {!screenshotPreview ? (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-brand-crimson/50 transition-all">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-10 h-10 mb-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mb-2 text-sm text-zinc-400">
                              <span className="font-semibold text-brand-crimson">Click to upload</span> payment screenshot
                            </p>
                            <p className="text-xs text-zinc-500">PNG, JPG (max 5MB)</p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleScreenshotChange}
                          />
                        </label>
                      ) : (
                        <div className="relative">
                          <img 
                            src={screenshotPreview} 
                            alt="Payment Screenshot" 
                            className="w-full h-40 object-contain rounded-xl border border-white/10 bg-white/5"
                          />
                          <button
                            type="button"
                            onClick={removeScreenshot}
                            className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-500 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Screenshot uploaded successfully
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-zinc-500 mt-2">
                        Upload a clear screenshot showing the payment confirmation with UTR number.
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
