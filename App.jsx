import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Layers, Box, Users, X, Mail, Check, ChevronRight } from 'lucide-react';
import Scene3D from './components/Scene3D';

// --- Components ---

const Logo = () => (
  <div className="absolute top-8 left-8 z-50 flex items-center gap-6">
    <span className="text-4xl font-normal tracking-widest text-black" style={{ fontFamily: 'Michroma, sans-serif' }}>ENUID</span>
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

const WishlistModal = ({ isOpen, onClose, onEmailAdded }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
        body: JSON.stringify({ email, timestamp: new Date().toISOString() })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === 'Email already registered') {
          setError('This email is already registered!');
          setIsLoading(false);
          return;
        }
        setIsSubmitted(true);
        onEmailAdded();
        setTimeout(() => {
          onClose();
          setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
          }, 300);
        }, 2000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Could not connect to server. Please try again.');
    } finally {
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
              <div className="bg-white p-12 md:p-16 shadow-2xl border border-gray-100">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 hover:bg-gray-50 transition-colors"
                >
                  <X className="w-6 h-6 text-black" />
                </button>

                {!isSubmitted ? (
                  <>
                    <h3 className="text-4xl font-bold text-black mb-6 tracking-tight">
                      Join waitlist
                    </h3>
                    <p className="text-gray-500 mb-10 text-lg font-light leading-relaxed">
                      Fluid Orbit is currently in private beta. Enter your email to get early access.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address"
                          className="w-full pb-4 bg-transparent border-b border-gray-200 text-black placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors text-xl"
                          disabled={isLoading}
                        />
                        {error && (
                          <p className="absolute top-full left-0 text-red-500 text-sm mt-2">
                            {error}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-black text-white font-bold hover:bg-gray-900 transition-colors flex items-center justify-center gap-4 text-lg"
                      >
                        {isLoading ? 'Processing...' : (
                          <>
                            Request Access <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Check className="w-16 h-16 text-black mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-black mb-4">You're on the list.</h3>
                    <p className="text-gray-500 text-lg">We'll be in touch soon.</p>
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

// --- Data ---

const principles = [
  { title: "Deliberate development", text: "We care more about getting it right than getting it out fast. We question assumptions, run real experiments, and accept that good systems take time." },
  { title: "Transparent systems", text: "We try to keep the mechanics visible. When possible, we show how things are ranked, why a result appears, and what is influencing the outcome." },
  { title: "Stable architecture", text: "We prefer solid foundations to clever hacks. We design for long term stability so the system does not crack the moment reality pushes back." },
  { title: "Built for people", text: "We build for humans first, not for metrics or trends. Useful, understandable, and respectful of the person on the other side of the screen." },
];

const experiments = [
  { id: "01", title: "Toward a modular, brain inspired architecture for AGI", status: "In progress", desc: "Exploring how to structure large systems as smaller, interacting modules instead of a single opaque block." },
  { id: "02", title: "Reliable product signals at internet scale", status: "In progress", desc: "Testing how to combine noisy data from marketplaces, brands, and real users into signals that can be trusted." },
  { id: "03", title: "Conversations as search programs", status: "Internal", desc: "Treating every user conversation as a short program that can plan, search, and refine results across many sources." },
  { id: "04", title: "Long term memory for shopping intent", status: "Exploratory", desc: "Figuring out how to remember what actually matters to a person over time without being creepy or invasive." },
  { id: "05", title: "Ranking without ads", status: "Design", desc: "Building ranking systems that do not depend on ad spend or hidden incentives." },
  { id: "06", title: "Trust that can be inspected", status: "Early notes", desc: "Designing interfaces where people can see why something is recommended and adjust the system when it is wrong." },
];

// --- Main Application ---

const EnuidLab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailCount, setEmailCount] = useState(0);
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
      
      <Scene3D />
      <VerticalLine />
      <Logo />

      {/* Navigation */}
      <nav className="absolute top-8 left-1/2 -translate-x-1/2 z-40 flex gap-4 text-sm font-light tracking-wide uppercase">
        <a href="#lab" className="px-6 py-2 rounded-lg transition-all bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/20 hover:border-white/40 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] text-black/80 hover:text-black">Lab</a>
        <a href="#fluid" className="px-6 py-2 rounded-lg transition-all bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/20 hover:border-white/40 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] text-black/80 hover:text-black">Fluid Orbit</a>
        <a href="#experiments" className="px-6 py-2 rounded-lg transition-all bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/20 hover:border-white/40 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] text-black/80 hover:text-black">Experiments</a>
      </nav>

      {/* 1. Hero / Concept Section */}
      <section className="relative h-screen w-full overflow-hidden pt-32 pb-10 flex flex-col">
        <div className="pl-[10%] w-full flex-grow flex flex-col justify-end relative">
          
          <div className="flex flex-col items-center w-full max-w-5xl mx-auto text-center z-10 relative">
            
            {/* Central Glowing Element Removed */}

            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-black leading-tight">
                Everything starts<br/>with an understanding.
              </h1>
              
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                We don't just build. We transform. From ideas to impact — welcome to the other side.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <a href="#fluid" className="px-8 py-4 rounded-lg transition-all bg-black/5 backdrop-blur-xl border border-black/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:bg-black/10 hover:border-black/20 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex items-center justify-center gap-2 text-black font-medium">
                  Explore Fluid Orbit <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#lab" className="px-8 py-4 rounded-lg transition-all bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/50 hover:border-white/60 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] flex items-center justify-center gap-2 text-gray-600 hover:text-black font-medium">
                  Read how we think <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About The Lab */}
      <section id="lab" className="relative z-10 py-32 px-6 lg:px-20 bg-gray-50">
        <div className="pl-[10%] px-12 lg:px-24 flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-black mb-8">The Lab</h2>
            <p className="text-3xl font-light text-black leading-tight border-l-4 border-black pl-8">
              .. build for people.
            </p>
          </motion.div>
          <div className="relative max-w-4xl">
            <div className="space-y-8 text-gray-600 text-xl leading-relaxed font-light">
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
      </section>

      {/* 3. How We Build */}
      <section className="relative z-10 py-32 px-6 lg:px-20">
        <div className="pl-[10%] px-12 lg:px-24">
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">How we build</h2>
            <div className="w-24 h-1 bg-black rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                  <div className="text-6xl font-bold text-gray-100 mb-6 group-hover:text-gray-200 transition-colors">0{i+1}</div>
                  <h3 className="text-2xl font-bold text-black mb-4">{item.title}</h3>
                </div>
                <p className="text-base text-gray-500 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Fluid Orbit */}
      <section id="fluid" className="relative min-h-screen w-full py-32 flex flex-col justify-center bg-black text-white">
        <div className="pl-[10%] px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div>
                <div className="flex items-center gap-3 mb-8">
                   <Box className="text-gray-400" />
                   <span className="font-mono text-gray-400 text-sm uppercase tracking-widest">The Shopping OS</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-bold text-white mb-10 tracking-tight">Fluid Orbit</h2>
                
                <div className="space-y-8 text-xl text-gray-400 mb-12 font-light leading-relaxed">
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

                <div className="inline-block">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto px-10 py-5 rounded-2xl transition-all bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 hover:border-white/40 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)] flex items-center justify-center gap-3 text-lg text-white font-bold"
                  >
                    Join the wishlist <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-sm text-gray-500 mt-6">You will hear from us before we open it up to everyone else.</p>
                </div>
             </div>
             
             {/* Visual/Shape for Fluid Orbit */}
             <div className="relative flex justify-center">
                <div className="w-64 h-64 border border-gray-800 rounded-full flex items-center justify-center relative">
                   <div className="absolute inset-0 border border-gray-800 rounded-full animate-ping opacity-20" />
                   <div className="text-center">
                     <span className="block text-4xl font-bold text-white">{emailCount}</span>
                     <span className="text-xs uppercase tracking-widest text-gray-500">Joined</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Experiments */}
      <section id="experiments" className="relative min-h-screen w-full py-32">
        <SectionLabel>Experiments</SectionLabel>
        
        <div className="pl-[10%] px-12 lg:px-24">
          <div className="mb-24">
             <h2 className="text-4xl font-bold mb-6">Experiments</h2>
             <p className="text-gray-500 max-w-2xl text-xl leading-relaxed">
               The lab runs on experiments. Some of them are large research efforts. Some are small notes that turn into systems later. Most of them are in progress.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {experiments.map((exp, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group min-h-[260px] flex flex-col p-8 border border-gray-100 hover:border-black transition-colors bg-white"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs text-gray-400">EXP-{exp.id}</span>
                  <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-gray-200 font-medium">
                    {exp.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-4 group-hover:underline decoration-2 underline-offset-4 leading-tight">
                  {exp.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 border-t border-gray-100">
        <div className="pl-[10%] px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
             <div className="text-sm font-bold tracking-widest uppercase">ENUID LABS</div>
             <div className="text-sm text-gray-400">Build for people</div>
          </div>
          <div className="flex gap-8 text-sm text-gray-400 font-bold uppercase tracking-wider">
            <a href="#" className="hover:text-black transition-colors">X</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

      <WishlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onEmailAdded={() => setEmailCount(p => p + 1)} />

    </div>
  );
};

export default EnuidLab;
