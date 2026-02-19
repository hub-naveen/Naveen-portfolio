import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Aspiring Data Scientist";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
  }));

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Subtle floating orbs — GPU-friendly transform+opacity only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.id % 3 === 0
                ? 'rgba(34,211,238,0.55)'
                : particle.id % 3 === 1
                ? 'rgba(139,92,246,0.55)'
                : 'rgba(226,232,240,0.45)',
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.15, particle.id % 2 === 0 ? 0.6 : 0.4, 0.15],
            }}
            transition={{
              duration: 4 + (particle.id % 3),
              repeat: Infinity,
              delay: (particle.id * 0.12) % 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/30 to-space-bg" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Profile Image Placeholder */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.2, type: 'spring', stiffness: 180 }}
            className="w-32 h-32 mx-auto mb-8 rounded-full p-[2px]"
            style={{ background: 'linear-gradient(135deg, #00b4d8, #8b5cf6, #e879f9)' }}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: 'var(--space-card)', boxShadow: 'inset 0 0 24px rgba(0,180,216,0.1)' }}
            >
              <span className="text-4xl font-bold gradient-text">NK</span>
            </div>
          </motion.div>

          {/* Name — letter-by-letter reveal */}
          <h1
            className="text-5xl md:text-7xl font-bold text-white hero-name-glow"
            aria-label="Naveen K"
          >
            {'Naveen K'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{ animationDelay: `${0.4 + i * 0.07}s` }}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-12 md:h-16 flex items-center justify-center"
          >
            <span className="text-2xl md:text-4xl font-mono" style={{ color: 'var(--electric-blue)' }}>
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            </span>
          </motion.div>

          {/* Description — reveal animation via CSS */}
          <p
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed hero-text-reveal hero-text-reveal-delay-3"
          >
            Passionate about machine learning, data analytics, and building intelligent systems.
            Based in Chennai, Tamil Nadu.
          </p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center space-x-6"
          >
            <motion.a
              href="https://github.com/hub-naveen"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-dark-card/60 border border-dark-border hover:border-cosmic-cyan/60 transition-colors"
            >
              <Github className="h-6 w-6 text-slate-400 hover:text-cosmic-cyan" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/7naveen"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-dark-card/60 border border-dark-border hover:border-cosmic-cyan/60 transition-colors"
            >
              <Linkedin className="h-6 w-6 text-slate-400 hover:text-cosmic-cyan" />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <MagneticButton as="a" strength={0.3} radius={120}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 flex items-center space-x-2"
              style={{ background: 'linear-gradient(135deg, var(--electric-blue), var(--cosmic-violet))', boxShadow: '0 0 20px rgba(0,180,216,0.35)' }}
            >
              <Download className="h-5 w-5" />
              <span>View Resume</span>
            </MagneticButton>
            <MagneticButton as="a" strength={0.3} radius={120}
              href="#contact"
              className="px-8 py-3 border border-cosmic-cyan text-cosmic-cyan font-semibold rounded-xl hover:bg-cosmic-cyan/10 transition-all duration-300 flex items-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span>Contact Me</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border border-cosmic-cyan/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-cosmic-cyan rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 