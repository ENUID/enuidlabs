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

const PrivacyModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl pointer-events-auto my-8"
            >
              <div className="bg-white p-8 md:p-12 shadow-2xl border border-gray-100 relative max-h-[80vh] overflow-y-auto rounded-lg">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 transition-colors rounded-full"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-black" />
                </button>

                <div className="pr-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">Privacy Policy</h2>
                  <p className="text-[10px] md:text-xs text-gray-500 mb-8">Last updated: 3/December/2025</p>

                  <div className="space-y-6 text-xs md:text-sm text-gray-700 leading-relaxed">
                    <p>
                      ENUID is an independent AI lab exploring new systems, experiments, and prototypes. This policy explains what we collect and how we handle it while we continue to build and test our work.
                    </p>

                    <div>
                      <h3 className="text-sm md:text-base font-bold text-black mb-2">Information we collect</h3>
                      <p className="mb-2">We collect limited information to keep the lab running and to understand how people use our work. This includes:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Information you share with us, such as your name or email if you contact us</li>
                        <li>Inputs you submit in our demos or prototypes</li>
                        <li>Basic analytics like device type, IP address, and usage patterns</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm md:text-base font-bold text-black mb-2">How we use the information</h3>
                      <p className="mb-2">We use this information to:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Operate and improve our experiments and prototypes</li>
                        <li>Understand how people interact with our work</li>
                        <li>Keep the lab's systems secure</li>
                        <li>Communicate with you when needed</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm md:text-base font-bold text-black mb-2">Sharing</h3>
                      <p>
                        We do not sell your personal data. We share information only with trusted service providers that help us host or operate parts of the site or when required by law.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm md:text-base font-bold text-black mb-2">Data retention</h3>
                      <p>
                        We store data only for as long as needed to run and improve our experiments. You can request deletion of your data at any time.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm md:text-base font-bold text-black mb-2">Security</h3>
                      <p>
                        We follow reasonable security practices for early stage research and experimental systems. While we work to protect your information, no system is perfectly secure.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm md:text-base font-bold text-black mb-2">Your choices</h3>
                      <p>
                        You can contact us to access, update, or delete your information.
                      </p>
                      <p className="mt-2">Email: <a href="mailto:no-reply@enuid.com" className="text-black underline">no-reply@enuid.com</a></p>
                    </div>

                    <div>
                      <h3 className="text-sm md:text-base font-bold text-black mb-2">Changes</h3>
                      <p>
                        As the lab evolves and our work expands, we may update this policy. We will reflect changes on this page.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm md:text-base font-bold text-black mb-2">Contact</h3>
                      <p>For any questions about this policy:</p>
                      <p className="mt-2"><a href="mailto:no-reply@enuid.com" className="text-black underline">no-reply@enuid.com</a></p>
                      <p className="mt-4 font-bold">ENUID <span className='font-medium'>(Evolving Neural Understanding Intelligence Development)</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const Blogs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Logo />

      {/* Mobile Menu Button - Only visible on mobile when menu is closed */}
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden absolute top-6 right-4 z-50 p-2.5 rounded-full bg-white backdrop-blur-md border border-black/20 hover:bg-gray-100 transition-all shadow-md"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-black" />
        </button>
      )}

      {/* Desktop Navigation - Only visible on desktop */}
      <nav className="hidden md:block absolute top-6 md:top-8 right-4 md:right-8 z-50 px-4 md:px-6 lg:px-8 py-2 md:py-3 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
        <div className="flex gap-3 md:gap-6 lg:gap-8 text-[10px] md:text-xs font-light tracking-wide uppercase">
          <Link to="/" className="transition-colors text-black/90 hover:text-black/70">Home</Link>
          <Link to="/#lab" className="transition-colors text-black/90 hover:text-black/70">Lab</Link>
          <Link to="/#fluid-orbit" className="transition-colors text-black/90 hover:text-black/70">Fluid Orbit</Link>
          <Link to="/#experiments" className="transition-colors text-black/90 hover:text-black/70">Experiments</Link>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-white z-40"
          >
            {/* Close Button - Only visible when menu is open */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-4 z-50 p-2.5 rounded-full bg-white backdrop-blur-md border border-black/20 hover:bg-gray-100 transition-all shadow-md"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* Menu Content */}
            <div className="flex flex-col items-end justify-center h-full px-8 pr-6">
              <motion.div 
                className="flex flex-col items-end gap-8 w-full"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {/* Navigation Links */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-right"
                >
                  <Link 
                    to="/" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-3xl font-light text-black hover:text-gray-700 transition-colors tracking-wider relative group"
                  >
                    Home
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-right"
                >
                  <Link 
                    to="/#lab" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-3xl font-light text-black hover:text-gray-700 transition-colors tracking-wider relative group"
                  >
                    Lab
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-right"
                >
                  <Link 
                    to="/#fluid-orbit" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-3xl font-light text-black hover:text-gray-700 transition-colors tracking-wider relative group"
                  >
                    Fluid Orbit
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-right"
                >
                  <Link 
                    to="/#experiments" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-3xl font-light text-black hover:text-gray-700 transition-colors tracking-wider relative group"
                  >
                    Experiments
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                  </Link>
                </motion.div>

                {/* Decorative Line */}
                <motion.div 
                  className="w-16 h-px bg-black/30 mt-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />

                {/* Footer Text */}
                <motion.p 
                  className="text-xs text-black/50 tracking-widest uppercase mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ENUID Labs
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

            <h4 className="text-lg md:text-xl mb-6 md:mb-8 pl-4 md:pl-8 lg:pl-16">1. ENUID</h4>

            <div className="space-y-6 md:space-y-8 pb-12 md:pb-16 pl-4 pr-4 md:pl-8 md:pr-12 lg:pl-16 lg:pr-40">
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

             
            </div>
              <p className="text-[10px] pt-4 md:text-xs text-gray-500 leading-relaxed pb-16 md:pb-20 lg:pb-24">
                   by: Team ENUID <br/>
                    Dated: 3/December/2025
              </p>

            <h4 className="text-lg md:text-xl mb-6 md:mb-8 pl-4 md:pl-8 lg:pl-16 pt-24 md:pt-6">2. FLUID ORBIT</h4>

            <div className="space-y-2 md:space-y-6 pb-8 md:pb-10 pl-4 pr-4 md:pl-8 md:pr-12 lg:pl-16 lg:pr-40">
              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                Today's e-commerce is fragmented. Huge marketplaces dominate. Small shops, niche retailers, and specialty stores are scattered across the web. For a customer, finding the right product often means jumping across dozens of marketplaces, wading through pages of mediocre recommendations, and sorting through inconsistent reviews and data.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                Many products are buried. Many good shops go unnoticed. Many buyers settle for convenience over quality. The result: a poor shopping experience, low discoverability for small sellers, and commoditization that favors volume over quality.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                Fluid Orbit is built to solve this, a Shopping OS: one place to find products across all kinds of stores from giant marketplaces to niche boutiques. Our goal is to break down marketplace monopoly, surface trusted, high quality and unique products, and give small businesses a fair shot.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                We believe that shopping should be where people describe what they want and get trusted and quality products from the entire internet not what an algorithm or marketplace decided to push.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed mb-3">
                What Fluid Orbit Does: <br/>
                       <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-black/80 leading-relaxed -mt-3">
                <li><span className="">Unified shopping:</span> Aggregates products across major marketplaces, niche stores, and niche/independent sellers.</li>
                <li><span className="">Rich ranking and recommendation logic:</span> Not just based on popularity or sales volume. Uses user-facing criteria (price, reviews, seller reliability), backend data (inventory, vendor quality), and ML-driven signals (diversity, long-tail products, niche fit).</li>
                <li><span className="">Curated, high-quality recommendations:</span> Focus on quality, uniqueness, and value not just what's trending.</li>
                <li><span className="">Support for small sellers and niche businesses:</span> By surfacing their products alongside big-brand options, Fluid Orbit gives them visibility and a chance to compete.</li>
                <li><span className="">Transparent metadata and product context:</span> Provide detailed specs, origin info, seller data, and honest reviews helping users make informed decisions rather than impulse buys.</li>
              </ul>
              </p>

       

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                E-commerce doesn't have to be a race to the bottom on price and volume. With Fluid Orbit, we can bring back trust, quality, fairness and convenience Buyers get better choices. Sellers get fair visibility. The internet becomes a place where unique, well-made products (not just bulk commodities) thrive.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                As global commerce becomes more complex, and as consumers care more about value, sustainability, and curation, Fluid Orbit stands for a return to thoughtful shopping. Fluid Orbit is an example of what's possible when you apply intelligent design and principled architecture to real-world problems.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                We try to solve root causes not just build another "better marketplace." It addresses fragmentation, discoverability, quality bias, and the monopoly power of large players.
              </p>

              <p className="text-xs md:text-sm text-black/80 leading-relaxed">
                We're currently prototyping the product that can ingest listings from multiple sources, standardize metadata, and rank them intelligently.
              </p>

              
            </div>
            <p className="text-[10px] pt-4 md:pt-3 md:text-xs text-gray-500 leading-relaxed pb-16 md:pb-20 lg:pb-24">
                   by: Team ENUID <br/>
                    Dated: 5/December/2025
              </p>
          </motion.article>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-16 lg:py-20 bg-black">
        <div className="px-4 md:px-8 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-8 mb-4 md:mb-8">
            {/* Copyright - Shows at bottom on mobile, left on desktop */}
            <div className="flex flex-col gap-2 justify-self-center md:justify-self-start text-center md:text-left order-last md:order-first">
              <p className="text-[10px] md:text-xs text-white">
                © {new Date().getFullYear()} ENUID. All rights Reserved.
              </p>
            </div>

            {/* Scroll to Top Button - Shows at top on mobile, center on desktop */}
            <div className="flex justify-center order-first md:order-none">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-2 md:p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Scroll to top"
              >
                ↑
              </button>
            </div>

            {/* Contact & Privacy Links */}
            <div className="flex gap-4 md:gap-6 lg:gap-8 text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider justify-self-center md:justify-self-end order-2 md:order-last">
              <a href="mailto:no-reply@enuid.com" className="hover:text-white transition-colors">Contact</a>
              <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-white transition-colors">PRIVACY</button>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </div>
  );
};

export default Blogs;