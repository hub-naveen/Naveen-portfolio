import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import SpaceBackground from './components/SpaceBackground';
import { SpaceProvider, useSpace } from './context/SpaceContext';

/* ─── Inner app that can access SpaceContext ─── */
const AppInner: React.FC = () => {
  const { bgRef } = useSpace();
  const [phase, setPhase] = useState<'loading' | 'exit' | 'done'>('loading');

  useEffect(() => {
    // Phase 1: Show loader for ~1.1s, then trigger exit animation
    const t1 = setTimeout(() => setPhase('exit'),  1100);
    // Phase 2: After exit animation (500ms), unmount loader
    const t2 = setTimeout(() => setPhase('done'), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#050b18' }}>
      {/* ── Persistent canvas starfield ── */}
      <SpaceBackground ref={bgRef} starCount={120} />

      {/* ── Cinematic Loader ── */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={phase === 'exit' ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.55, 0, 1, 0.45] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#030810',
            }}
          >
            {/* Expanding ring pulses */}
            {[0, 0.5, 1.0].map((delay) => (
              <motion.div
                key={delay}
                initial={{ scale: 0.4, opacity: 0.6 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  border: '1px solid rgba(34, 211, 238, 0.35)',
                  pointerEvents: 'none',
                }}
              />
            ))}
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00b4d8, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 0 32px rgba(0,180,216,0.4)',
                }}
              >
                <span
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  NK
                </span>
              </div>
              <p
                style={{
                  color: 'rgba(34, 211, 238, 0.6)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Entering Universe…
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Portfolio ── */}
      {phase === 'done' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Experience />
            <Certifications />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </motion.div>
      )}
    </div>
  );
};

/* ─── Root App with context provider ─── */
function App() {
  return (
    <SpaceProvider>
      <AppInner />
    </SpaceProvider>
  );
}

export default App;

