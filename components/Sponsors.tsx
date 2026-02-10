import React from 'react';
import { LogoLoop } from './ui/LogoLoop';

const sponsorLogos = [
  { 
    src: "/assets/dendrites.jpeg", 
    alt: "Dendrites", 
    href: "https://www.dendrites.ai/",
    title: "Dendrites"
  },
  { 
    src: "/assets/studenttribe.jpeg", 
    alt: "Student Tribe", 
    href: "https://studenttribe.in/",
    title: "Student Tribe"
  },
  { 
    src: "/assets/youngistaan.jpeg", 
    alt: "Youngistaan Foundation", 
    href: "https://youngistaanfoundation.org/",
    title: "Youngistaan Foundation"
  },
  { 
    src: "/assets/Ather.jpg", 
    alt: "Ather Energy", 
    href: "https://www.atherenergy.com/",
    title: "Ather Energy"
  },
  { 
    src: "/assets/cliqhaus.jpg", 
    alt: "Cliqhaus", 
    href: "https://cliqhaus.in/",
    title: "Cliqhaus"
  },
  { 
    src: "/assets/cognalis.jpg", 
    alt: "Cognalis", 
    href: "https://cognalissolutions.com/",
    title: "Cognalis"
  }
];

export const Sponsors: React.FC = () => {
  return (
    <section id="sponsors" className="py-24 bg-brand-black text-white relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-crimson/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-display font-black mb-6 uppercase leading-tight tracking-tighter">
            Powered by our <span className="text-brand-crimson">Sponsors</span>
          </h2>
          <p className="text-xl text-zinc-400 font-medium">
            Thank you to our amazing sponsors who make this conference possible
          </p>
        </div>

        {/* Logo Loop */}
        <div className="relative max-w-6xl mx-auto">
          <style>{`
            .sponsor-logo {
              isolation: isolate;
            }
            .sponsor-logo img {
              mix-blend-mode: screen;
              background-color: transparent !important;
            }
          `}</style>
          <div className="sponsor-logo">
            <LogoLoop
              logos={sponsorLogos}
              speed={50}
              direction="left"
              logoHeight={120}
              gap={80}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#0A0A0A"
              ariaLabel="Conference sponsors"
            />
          </div>
        </div>

        {/* Sponsor CTA */}
        <div className="text-center mt-16">
          <p className="text-zinc-400 mb-6">Interested in becoming a sponsor?</p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-black font-bold uppercase rounded-full hover:bg-brand-crimson hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <span>Get in Touch</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
