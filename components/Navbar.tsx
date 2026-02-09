
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 h-20' : 'bg-transparent h-24'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center relative">
        <Link to="/" className={`flex items-center self-start transition-all duration-300 ${
          isScrolled ? 'pt-0' : 'pt-2'
        }`}>
          <img 
            src="/assets/Logo.png" 
            alt="LoveForAi Logo" 
            className="h-20 w-auto max-w-none"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isPageLink = item.href.startsWith('/');
            if (isPageLink) {
              return (
                <Link 
                  key={item.href} 
                  to={item.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              );
            }
            return isHomePage ? (
              <a 
                key={item.href} 
                href={item.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={item.href} 
                to={`/${item.href}`}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
          <Link 
            to="/pricing" 
            className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-brand-crimson hover:text-white transition-all transform hover:scale-105 active:scale-95"
          >
            Register Now
          </Link>
        </div>

        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const isPageLink = item.href.startsWith('/');
            if (isPageLink) {
              return (
                <Link 
                  key={item.href} 
                  to={item.href}
                  className="text-lg font-medium text-white/90 hover:text-brand-crimson transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }
            return isHomePage ? (
              <a 
                key={item.href} 
                href={item.href}
                className="text-lg font-medium text-white/90 hover:text-brand-crimson transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={item.href} 
                to={`/${item.href}`}
                className="text-lg font-medium text-white/90 hover:text-brand-crimson transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/pricing"
            className="px-5 py-3 bg-white text-black text-center text-sm font-bold rounded-full hover:bg-brand-crimson hover:text-white transition-all mt-2"
            onClick={() => setIsOpen(false)}
          >
            Register Now
          </Link>
        </div>
      )}
    </nav>
  );
};
