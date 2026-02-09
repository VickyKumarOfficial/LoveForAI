import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';

const ContactPage: React.FC = () => {
  const telegramLink = 'https://t.me/+mzc0ek8zAzs5ZTVl';
  const email = 'loveforai@klh.edu.in';
  const emailSubject = 'Love For AI Conference 2026';
  const emailBody = 'Hello Love For AI Team,';
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const telegramQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(telegramLink)}&bgcolor=0a0a0a&color=ffffff`;
  const handleSendEmail = () => {
    const composeWindow = window.open(gmailComposeLink, '_blank', 'noopener,noreferrer');
    if (!composeWindow) {
      window.location.href = mailtoLink;
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-black text-white">
        <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-black mb-4">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-crimson to-brand-rose">Touch</span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Have questions? Want to collaborate? Reach out to us through Telegram or email for updates and inquiries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Telegram Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-brand-crimson/50 transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0088cc]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Telegram</h3>
              <p className="text-white/50 text-sm mb-6">
                Join our Telegram group for real-time updates and community discussions
              </p>
              
              {/* QR Code */}
              <div className="bg-white p-4 rounded-xl inline-block mb-6">
                <img 
                  src={telegramQRUrl} 
                  alt="Telegram QR Code" 
                  className="w-40 h-40"
                />
              </div>
              
              <div>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0088cc] text-white font-bold rounded-xl hover:bg-[#0077b3] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Join Telegram Group
                </a>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-brand-crimson/50 transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-crimson/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Email</h3>
              <p className="text-white/50 text-sm mb-6">
                For official inquiries, partnerships, or sponsorship opportunities
              </p>
              
              {/* Email Display */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <p className="text-xl font-mono text-white/80 break-all">
                  {email}
                </p>
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-crimson text-white font-bold rounded-xl hover:bg-brand-crimson/80 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </button>
              </div>
            </motion.div>
          </div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
};

export default ContactPage;
