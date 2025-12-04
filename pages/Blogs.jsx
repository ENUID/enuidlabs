import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Logo = () => (
  <div className="absolute top-4 left-4 md:left-8 z-50 flex items-center gap-2 md:gap-3">
    <img src="/white tab logo .JPG" alt="ENUID Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain" />
    <span className="text-lg md:text-xl lg:text-2xl font-normal tracking-widest text-black" style={{ fontFamily: 'Michroma, sans-serif' }}>ENUID</span>
  </div>
);

const Blogs = () => {
  return (
    <div className="relative min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Logo />

      {/* Navigation */}
      <nav className="absolute top-6 md:top-8 right-4 md:right-8 z-50 px-4 md:px-6 lg:px-8 py-2 md:py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
        <div className="flex gap-3 md:gap-6 lg:gap-8 text-[10px] md:text-xs font-light tracking-wide uppercase">
          <Link to="/" className="transition-colors text-black/90 hover:text-black/70">Home</Link>
          <Link to="/#lab" className="transition-colors text-black/90 hover:text-black/70">Lab</Link>
          <Link to="/#fluid" className="transition-colors text-black/90 hover:text-black/70">Fluid</Link>
          <Link to="/#experiments" className="transition-colors text-black/90 hover:text-black/70 hidden sm:inline">Experiments</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Blog Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-sm md:prose-lg max-w-none"
          >
            <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-8xl text-center font-300 text-black mb-8 md:mb-12">
              Journal!
            </h1>

            <h4 className="text-lg md:text-xl mb-6 md:mb-8">1. ENUID</h4>

            <div className="space-y-6 md:space-y-8 pb-8 md:pb-10 pl-4 pr-4 md:pl-8 md:pr-12 lg:pl-16 lg:pr-40">
              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                ENUID is a lab, a focused and independent space where intelligence is studied, questioned, built, broken, and rebuilt until it's actually useful. The mission is not to impress the world. It is to change what's possible. We believe the next generation of intelligence should not be built by accident. Instead intelligence should be built by intention, deliberately and with care. ENUID is a lab for intelligence that works rather than merely performs. Our aim is intelligence that thinks, adapts, and respects the humans using it.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                Our first product is Fluid Orbit. According to ENUID: Fluid Orbit is not a store or a marketplace. It is a "Shopping OS": a conversational system that understands your intent and helps you find the products you actually need, across the entire internet, e-commerce marketplaces, niche stores run by companies and individuals. We build solutions because online shopping today is messy: fake reviews, ads and sponsored products, endless nested filters. Fluid Orbit aims to deliver real, trusted, quality results: fast, clean, honest and convenient.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                The current state of online intelligence whether in AI or e-commerce discovery often values hype over utility. ENUID challenges that by building systems with purpose, clarity, and human respect. For us, intelligence is not a badge. It's a responsibility. A system that helps people find what they truly need whether it's information or products must be built transparently, ethically, and with care.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                ENUID is not chasing trends. We are building tools that should exist. Tools that matter, for people. We are building tools that should exist. Tools that matter, for people.
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed pb-16 md:pb-20 lg:pb-24">
                   by: Team ENUID <br/>
                    Dated: 3/December/2025
                      </p>

            </div>
          </motion.article>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 md:py-16 lg:py-20 bg-black">
        <div className="px-4 md:px-8 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="flex flex-col gap-2 justify-self-start text-center md:text-left">
             <div className="text-start pt-6 md:pt-8 border-gray-800">
            <p className="text-xs md:text-sm text-white">
              © {new Date().getFullYear()}  ENUID. All rights Reserved.
            </p>
          </div>
            </div>

            <div className="flex justify-center order-first md:order-none">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full"
              >
                ↑
              </button>
            </div>

            <div className="flex gap-6 md:gap-8 text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider justify-self-center md:justify-self-end">
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>

          {/* Copyright */}
          
        </div>
      </footer>
    </div>
  );
};

export default Blogs;