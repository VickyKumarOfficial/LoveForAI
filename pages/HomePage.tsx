import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SpeakerGrid } from '../components/SpeakerGrid';
import { Agenda } from '../components/Agenda';
import { Waitlist } from '../components/Waitlist';
import { Footer } from '../components/Footer';
import { DeviceIntro } from '../components/DeviceIntro';
import { SmoothScroll } from '../components/SmoothScroll';
import { CustomCursor } from '../components/CustomCursor';

const HomePage: React.FC = () => {
  return (
    <DeviceIntro>
      <SmoothScroll />
      <CustomCursor />
      <div className="min-h-screen bg-brand-black text-white selection:bg-brand-crimson selection:text-white">
        {/* Visual background noise/texture */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] overflow-hidden">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <Navbar />

      <main>
        <Hero />

        {/* What to Expect */}
        <section id="about" className="py-24 bg-brand-black text-white relative overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-crimson/5 to-transparent pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-5xl font-display font-black mb-6 uppercase leading-tight tracking-tighter">What to <span className="text-brand-crimson">Expect</span></h2>
              <p className="text-xl text-zinc-400 font-medium">
                Two days of immersive learning, networking, and innovation in the heart of Hyderabad's tech ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-crimson transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-brand-crimson/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-brand-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-black uppercase mb-3">Learn</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Deep-dive workshops and keynotes from industry leaders on the latest AI trends, tools, and techniques.
                </p>
              </div>

              <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-crimson transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-brand-crimson/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-brand-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-black uppercase mb-3">Network</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Connect with fellow AI enthusiasts, students, and professionals. Build relationships that last beyond the conference.
                </p>
              </div>

              <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-crimson transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-brand-crimson/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-brand-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-black uppercase mb-3">Innovate</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Participate in hands-on sessions and collaborative projects. Turn ideas into reality with expert guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SpeakerGrid />
        <Agenda />
        
        {/* Venue Preview */}
        <section id="venue" className="py-24 bg-white text-black relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-5xl font-display font-black mb-6 uppercase leading-tight tracking-tighter">Hosted at the <br/><span className="text-brand-crimson">Heart of Innovation</span></h2>
                <p className="text-zinc-600 mb-8 font-medium">
                  We've secured the college's state-of-the-art Main Auditorium, equipped with surround sound and high-fidelity projection for an immersive keynote experience.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-zinc-200 rounded-xl hover:border-brand-crimson transition-colors">
                    <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-brand-crimson">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h5 className="font-bold uppercase text-xs">Main Auditorium</h5>
                      <p className="text-sm text-zinc-500"><a href="https://maps.app.goo.gl/E7zbu8ZPa7xf55kb9">KL Hyderabad, Aziz Nagar</a></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-zinc-200 rounded-xl hover:border-brand-crimson transition-colors">
                    <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-brand-crimson">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h5 className="font-bold uppercase text-xs">When</h5>
                      <p className="text-sm text-zinc-500">Feb 14, 2026 @ 09:00 AM SHARP</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 w-full h-[400px] bg-zinc-200 rounded-3xl overflow-hidden shadow-2xl relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.622083981882!2d78.33781!3d17.3488156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb959fee5b3bad%3A0x294b001a89bbce8f!2sKL%20University%20Aziz%20Nagar%20Hyderabad!5e0!3m2!1sen!2sin!4v1706428800000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <Waitlist />
      </main>

      <Footer />
    </div>
    </DeviceIntro>
  );
};

export default HomePage;
