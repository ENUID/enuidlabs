import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Layers, Box, Users, X, Mail, Check, ChevronRight, ChevronUp, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Components ---

const Logo = () => (
  <div className="absolute top-4 left-4 md:left-8 z-50 flex items-center gap-2 md:gap-3">
    <img src="/logo_2-.png" alt="ENUID Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain" />
    <span className="text-lg md:text-xl lg:text-2xl font-normal tracking-widest text-white" style={{ fontFamily: 'Michroma, sans-serif' }}>ENUID</span>
  </div>
);

const VerticalLine = () => (
  <div className="fixed left-[10%] top-0 bottom-0 w-[1px] bg-gray-100 z-0" />
);

const MassiveTitle = ({ children, className = "" }) => (
  <h1 className={`text-[12vw] leading-[0.8] font-bold tracking-tighter text-black select-none ${className}`}>
    {children}
  </h1>
);

const SectionLabel = ({ children }) => (
  <div className="absolute left-[10%] -translate-x-1/2 top-12 -rotate-90 origin-center text-xs font-bold tracking-widest uppercase text-black/40 whitespace-nowrap">
    {children}
  </div>
);

const ProductShape = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="relative w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]"
  >
    <div className="absolute inset-0 bg-gray-900 rounded-[100%] transform rotate-12 shadow-2xl" />
    <div className="absolute inset-[2%] bg-gray-800 rounded-[100%] transform rotate-12" />
    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-black opacity-50 rounded-[100%] transform rotate-12" />
  </motion.div>
);

const WishlistModal = ({ isOpen, onClose, onEmailAdded, initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  // Update email when initialEmail changes
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.PROD ? '/api/save-email' : 'http://localhost:3001/api/save-email';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim(), timestamp: new Date().toISOString() })
      });

      const data = await response.json();

      if (data.message === 'Email already registered') {
        setError('This email is already on the waitlist');
        setIsLoading(false);
        return;
      }

      // Only show success if email was actually saved
      setIsSubmitted(true);
      onEmailAdded();
      setTimeout(() => {
        onClose();
        setEmail('');
      }, 1500);
    } catch (err) {
      console.error('Error saving email:', err);
      setError('Failed to save email. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg pointer-events-auto"
            >
              <div className="bg-white p-8 md:p-12 lg:p-16 shadow-2xl border border-gray-100 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 transition-colors rounded-full"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-black" />
                </button>

                {!isSubmitted ? (
                  <>
                    <h3 className="text-xl md:text-2xl font-bold text-black mb-4 md:mb-6 tracking-tight">
                      Join waitlist
                    </h3>
                    <p className="text-gray-500 mb-8 md:mb-10 text-xs md:text-sm font-light leading-relaxed">
                      Fluid Orbit is currently in private beta. Enter your email to get early access.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address"
                          className="w-full pb-3 md:pb-4 bg-transparent border-b border-gray-200 text-black placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors text-sm md:text-base"
                          disabled={isLoading}
                        />
                        {error && (
                          <p className="absolute top-full left-0 text-red-500 text-[10px] md:text-xs mt-2 pb-4">
                            {error}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 md:py-4 bg-black text-white font-bold hover:bg-gray-900 transition-colors flex items-center justify-center text-xs md:text-sm"
                      >
                        {isLoading ? 'Processing...' : 'Request Access'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <Check className="w-6 h-6 md:w-8 md:h-8 text-black mx-auto mb-4 md:mb-6" />
                    <h3 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">You're on the list.</h3>
                    <p className="text-gray-500 text-xs md:text-sm">We'll be in touch soon.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

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

          <div className="fixed inset-0 z-50 flex  items-center justify-center p-4 pointer-events-none overflow-y-auto">
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

                <div className="pr-8 ">
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
                      <p className="mt-2"><a href="mailto:no-reply@gmail.com" className="text-black underline">no-reply@enuid.com</a></p>
                      <p className="mt-4 font-bold">ENUID <span className='font-medium'>(Evolving Neural Understanding Intelligence Development) </span></p>
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

// --- Data ---

const principles = [
  { title: "Deliberate development", text: "We care more about getting it right than getting it out fast. We question assumptions, run real experiments, and accept that good systems take time." },
  { title: "Transparent systems", text: "We try to keep the mechanics visible. When possible, we show how things are ranked, why a result appears, and what is influencing the outcome." },
  { title: "Stable architecture", text: "We prefer solid foundations to clever hacks. We design for long term stability so the system does not crack the moment reality pushes back." },
  { title: "Built for people", text: "We build for humans first, not for metrics or trends. Useful, understandable, and respectful of the person on the other side of the screen." },
];

const experiments = [
  { id: "01", title: "Shop at the Speed of Thought.", status: "In progress", desc: "Most searches are vague, messy, or incomplete, and marketplaces only match keywords, ad products, sponsors. Fluid Orbit is experimenting with ways to interpret intent the way a person would understanding preferences, constraints, tradeoffs, and the nuance behind each request, so the system can guide people to the right product without guesswork." },
  { id: "02", title: "", status: "", desc: "" },
  { id: "03", title: "", status: "", desc: "" },
];

// --- Main Application ---

const EnuidLab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [emailCount, setEmailCount] = useState(0);
  const [mainEmail, setMainEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [hasJoined, setHasJoined] = useState(false);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const fetchEmailCount = async () => {
      try {
        const apiUrl = import.meta.env.PROD ? '/api/emails/count' : 'http://localhost:3001/api/emails/count';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setEmailCount(data.count);
      } catch (err) {
        console.log('Could not fetch email count');
      }
    };
    fetchEmailCount();
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* Black Background */}
      <div 
        className="fixed inset-0 z-0 bg-black"
      />
      
      <Logo />

      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden absolute top-6 right-4 z-50 p-2.5 rounded-full bg-black/90 backdrop-blur-md border border-white/20 hover:bg-black transition-all"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Desktop Navigation - Only visible on desktop */}
      <nav className="hidden md:block absolute top-6 md:top-8 right-4 md:right-8 z-50 px-4 md:px-6 lg:px-8 py-2 md:py-3 rounded-lg bg-white/100 backdrop-blur-sm border border-white/60">
        <div className="flex gap-3 md:gap-6 lg:gap-8 text-[10px] md:text-xs font-light tracking-wide uppercase">
          <a href="#lab" className="transition-colors text-black/100 hover:text-black/60">Lab</a>
          <a href="#fluid-orbit" className="transition-colors text-black/100 hover:text-black/60">Fluid Orbit</a>
          <a href="#experiments" className="transition-colors text-black/100 hover:text-black/60">Experiments</a>
          <Link to="/blogs" className="transition-colors text-black/100 hover:text-black/60">Journal</Link>
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
            className="md:hidden fixed inset-0 bg-black z-40"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-4 z-50 p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white" />
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
                <motion.a 
                  href="#lab" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-3xl font-light text-white hover:text-gray-300 transition-colors tracking-wider relative group text-right"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  Lab
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                </motion.a>

                <motion.a 
                  href="#fluid-orbit" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-3xl font-light text-white hover:text-gray-300 transition-colors tracking-wider relative group text-right"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Fluid Orbit
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                </motion.a>

                <motion.a 
                  href="#experiments" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-3xl font-light text-white hover:text-gray-300 transition-colors tracking-wider relative group text-right"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  Experiments
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                </motion.a>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-right"
                >
                  <Link 
                    to="/blogs" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-3xl font-light text-white hover:text-gray-300 transition-colors tracking-wider relative group"
                  >
                    Journal
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                  </Link>
                </motion.div>

                {/* Decorative Line */}
                <motion.div 
                  className="w-16 h-px bg-white/30 mt-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />

                {/* Footer Text */}
                <motion.p 
                  className="text-xs text-white/50 tracking-widest uppercase mt-2"
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
    
      {/* 1. Hero / Concept Section */}
      <section className="relative min-h-screen w-full overflow-hidden pt-24 md:pt-32 pb-10 flex flex-col z-10">
        <div className="w-full flex-grow flex items-center relative px-4 md:px-8 lg:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">
            {/* Left Column - Text Content */}
            <div className="flex flex-col items-start z-10 relative">
              
              {/* Central Glowing Element Removed */}

              <div className="space-y-6 md:space-y-8 pt-12 md:pt-20 lg:pt-0">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                 
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-white leading-tight" style={{ fontWeight: 400 }}>
                    Everything starts<br/>with an understanding.
                  </h1>
                </div>
                
                <p className="text-sm md:text-base text-white/80 max-w-2xl leading-relaxed">
                 ENUID is an independent lab for studying and building intelligence carefully. We question it, break it, rebuild it, and keep going until it is actually useful for people in the real world.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 pt-4">
                  <a href="#fluid-orbit" className="px-6 py-3 rounded-lg transition-all bg-white text-black border border-white hover:bg-gray-100 flex items-center justify-center gap-2 font-medium text-sm md:text-base w-full sm:w-auto">
                     Fluid Orbit <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Hand Image */}
            <div className="flex justify-center lg:justify-end items-center h-full overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full max-w-lg px-4 lg:px-0"
              >
                <img
                  src="/hand.JPG"
                  alt="ENUID Hand"
                  className="w-full h-auto object-contain rounded-lg max-w-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-12 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      {/* 2. About The Lab */}
      <section id="lab" className="relative z-10 py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-20 bg-white">
        <div className="px-4 md:px-8 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left Column - Text Content */}
            <div className="flex flex-col gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-xl md:text-2xl font-700 text-black mb-4 md:mb-6">The Lab: Build for people.</h2>
                <div className="w-12 h-0.5 bg-black rounded-full mb-6 md:mb-8" />
              </motion.div>
              <div className="relative max-w-2xl">
                <div className="space-y-6 md:space-y-8 text-gray-600 text-sm md:text-base leading-relaxed font-light">
                  <p>
                    We treat intelligence as something to study, not just a feature to ship. That means sitting with hard problems, running experiments that might fail, and taking the time to understand what we are building before we scale it.
                  </p>
                  <p>
                    Most systems are thrown together by accident, patched over, and held up by hype. We are trying to do the opposite. Everything on purpose. Clear about what we are doing. Honest about what works and what does not.
                  </p>
                  <p>
                    This lab exists so we can build systems that people can rely on for a long time, not just ride the next cycle.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Video (Vertical Alignment) */}
            <div className="flex justify-center lg:justify-end items-center h-full mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md"
              >
                <video
                  className="w-full h-auto object-cover rounded-lg shadow-xl"
                  autoPlay 
                  loop
                  muted
                  playsInline
                >
                  <source src="/IMG_8156.MP4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-12 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>
      </div>

      {/* 3. How We Build */}
      <section className="relative z-10 py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-20 bg-white">
        <div className="px-4 md:px-8 lg:px-24 max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 lg:mb-24">
            <h2 className="text-xl md:text-2xl font-700 text-black mb-4 md:mb-6">How we build</h2>
            <div className="w-12 h-0.5 bg-black rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {principles.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col justify-between group"
              >
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 md:mb-6 group-hover:text-gray-200 transition-colors">0{i+1}</div>
                  <h3 className="text-lg md:text-xl font-700 text-black mb-3 md:mb-4">{item.title}</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider - Transition to Black Section */}
      <div className="relative z-10 bg-gradient-to-b from-white to-black py-16">
        <div className="max-w-7xl mx-auto px-12 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
        </div>
      </div>

      {/* 4. Fluid Orbit */}
      <section id="fluid-orbit" className="relative min-h-screen w-full md:py-8 flex flex-col justify-center bg-black text-white">
        <div className="px-4 md:px-8 lg:px-24 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
             {/* Left Column - Text Content */}
             <div>
                <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                   <video
                     className="w-10 h-10 md:w-14 md:h-14 object-cover rounded"
                     autoPlay
                     loop
                     muted
                     playsInline
                   >
                     <source src="/tick.MP4" type="video/mp4" />
                   </video>
                   <span className="font-mono text-gray-300 text-xs md:text-sm uppercase tracking-widest">The Shopping OS</span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-700 text-white mb-6 md:mb-8 lg:mb-10 tracking-tight">Fluid Orbit</h2>
                
                <div className="space-y-4 md:space-y-6 lg:space-y-8 text-sm md:text-base text-gray-400 mb-8 md:mb-10 lg:mb-12 font-light leading-relaxed">
                  <p>
                    Fluid Orbit is not a marketplace. It is not a store. It does not run ads. It does not take money from sponsors. It does not push affiliate links.
                  </p>
                  <p>
                    It is a shopping operating system that understands what you are trying to do, then searches across the internet for what you actually need. Big marketplaces, small niche stores, independent brands. All in one place.
                  </p>
                  <p>
                    Today, most shopping interfaces are tuned for whoever pays, not for you. Rankings are skewed, reviews are gamed, and filters fight each other. Fluid Orbit is a clean layer on top of all that clutter, built only for your side.
                  </p>
                </div>

                {/* New Wishlist Design */}
                <div className="space-y-4 md:space-y-6">
                  <p className="text-xs md:text-sm text-gray-300 font-light">
                    If that sounds like something you'd want, hop on the wishlist.
                  </p>
                  
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    
                    if (!mainEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mainEmail)) {
                      setSubmitMessage('Please enter a valid email address');
                      return;
                    }

                    setIsSubmitting(true);
                    setSubmitMessage('');

                    try {
                      const apiUrl = import.meta.env.PROD ? '/api/save-email' : 'http://localhost:3001/api/save-email';
                      const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: mainEmail.toLowerCase().trim(), timestamp: new Date().toISOString() })
                      });

                      const data = await response.json();

                      if (data.message === 'Email already registered') {
                        setSubmitMessage('This email is already on the waitlist');
                        setIsSubmitting(false);
                        return;
                      }

                      // Only show success if email was actually saved
                      setSubmitMessage('Wishlist Joined');
                      setHasJoined(true);
                      setEmailCount(prev => prev + 1);

                      // Reset after 2 seconds
                      setTimeout(() => {
                        setHasJoined(false);
                        setSubmitMessage('');
                        setMainEmail('');
                        setIsSubmitting(false);
                      }, 2000);
                    } catch (err) {
                      console.error('Error saving email:', err);
                      setSubmitMessage('Failed to connect. Please try again.');
                      setIsSubmitting(false);
                    }
                  }} className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <input
                      type="email"
                      value={mainEmail}
                      onChange={(e) => setMainEmail(e.target.value)}
                      placeholder="Enter your Email"
                      className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-white text-black placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-sm md:text-base"
                      required
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 sm:px-8 md:px-10 lg:px-12 py-3 md:py-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base font-semibold whitespace-nowrap disabled:cursor-not-allowed min-w-[140px] sm:min-w-[160px] md:min-w-[180px] ${
                        hasJoined 
                          ? 'bg-white text-black border-2 border-white shadow-lg' 
                          : 'bg-gray-600 text-black hover:bg-gray-500 disabled:opacity-50 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isSubmitting ? 'Waitlist Joined' : hasJoined ? 'Waitlist Joined' : 'Join Waitlist'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                  
                  {submitMessage && (
                    <p className={`text-xs md:text-sm ${submitMessage.includes('already') || submitMessage.includes('wrong') || submitMessage.includes('connect') ? 'text-red-400' : 'text-green-400'}`}>
                      {submitMessage}
                    </p>
                  )}
                  
                  <p className="text-xs md:text-sm text-gray-500">
                    {emailCount} people joined the waitlist
                  </p>
                </div>
             </div>

             {/* Right Column - Fluid Orbit Video */}
             <div className="flex justify-center lg:justify-end items-center h-full mt-8 lg:mt-0">
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="relative w-full max-w-md"
               >
                 <video
                   className="w-full h-auto object-cover rounded-lg shadow-xl"
                   autoPlay
                   loop
                   muted
                   playsInline
                 >
                   <source src="/FOvid.MP4" type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               </motion.div>
             </div>

          </div>
        </div>
      </section>

      {/* Divider - Transition from Black to White */}
      <div className="relative z-10 bg-gradient-to-b from-black to-white py-16">
        <div className="max-w-7xl mx-auto px-12 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
        </div>
      </div>

      {/* 5. Experiments */}
      <section id="experiments" className="relative min-h-screen w-full py-16 md:py-24 lg:py-32 bg-white">
        
        <div className="px-4 md:px-8 lg:px-24 max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 lg:mb-24">
             <h2 className="text-xl md:text-2xl font-700 mb-4 md:mb-6">Experiments</h2>
             <div className="w-12 h-0.5 bg-black rounded-full mb-4 md:mb-6" />
             <p className="text-gray-500 max-w-3xl text-sm md:text-base leading-relaxed">
              Everything we build for Fluid Orbit starts as an experiment. Some are small ideas that turn into real features. Others are deeper investigations into how people search, compare, and trust products. All of them move Fluid Orbit closer to becoming the Shopping OS.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {experiments.map((exp, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group min-h-[220px] md:min-h-[260px] flex flex-col p-6 md:p-8 border border-gray-100 hover:border-black transition-colors bg-white"
              >
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <span className="font-mono text-[10px] md:text-xs text-gray-400">EXP-{exp.id}</span>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider px-2 md:px-3 py-1 rounded-full border border-gray-200 font-medium">
                    {exp.status}
                  </span>
                </div>
                <h3 className="text-sm md:text-base font-700 text-black mb-3 md:mb-4 leading-tight">
                  {exp.title}
                </h3>
                <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 md:py-16 lg:py-20 bg-black">
        <div className="px-4 md:px-8 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Left: ENUID LABS */}
            <div className="flex flex-col gap-2 justify-self-start text-center md:text-left">
               <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white">ENUID LABS</div>
               <div className="text-[10px] md:text-xs text-gray-500">Build for people</div>
            </div>
            
            {/* Center: Upward Arrow */}
            <div className="flex justify-center order-first md:order-none">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white-200"
              >
                <ChevronUp className="w-5 h-5 md:w-6 md:h-6 hover:text-white" />
              </button>
            </div>
            
            {/* Right: Contact & Privacy */}
            <div className="flex gap-6 md:gap-8 text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider justify-self-center md:justify-self-end">
              <a href="mailto:no-reply@gmail.com" className="hover:text-white transition-colors">Contact</a>
              <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-white transition-colors">PRIVACY</button>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center md:text-start pt-6 md:pt-8 border-t border-gray-800">
            <p className="text-xs md:text-sm text-gray-500">
             © {new Date().getFullYear()}  ENUID. All rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      <WishlistModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setMainEmail('');
        }} 
        onEmailAdded={() => {
          setEmailCount(p => p + 1);
          setMainEmail('');
        }}
        initialEmail={mainEmail}
      />

      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </div>
  );
};

export default EnuidLab;
