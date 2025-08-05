import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const certifications = [
    {
      id: 1,
      title: "Introduction to Computers and Operating Systems and Security",
      platform: "Microsoft, Coursera",
      year: "2023",
      icon: "🔒",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Foundations of CyberSecurity",
      platform: "Google, Coursera",
      year: "2023",
      icon: "🛡️",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Game Development Using PyGame",
      platform: "Coursera",
      year: "2024",
      icon: "🎮",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Metaverse",
      platform: "Meta, Coursera",
      year: "2024",
      icon: "🌐",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 5,
      title: "Build a free website with WordPress",
      platform: "Coursera",
      year: "2024",
      icon: "🌐",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 6,
      title: "TCS iON Career Edge-Young Professional",
      platform: "TCS iON",
      year: "2024",
      icon: "💼",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 7,
      title: "Data Protection Basics",
      platform: "Atingi",
      year: "2024",
      icon: "🔐",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 8,
      title: "Python Essential_1",
      platform: "Cisco Academy",
      year: "2024",
      icon: "🐍",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 9,
      title: "Python Essential_2",
      platform: "Cisco Academy",
      year: "2025",
      icon: "🐍",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 10,
      title: "Intro to SQL",
      platform: "Kaggle",
      year: "2025",
      icon: "🗄️",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 11,
      title: "Data Analyst",
      platform: "SkillUp",
      year: "2025",
      icon: "📊",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 12,
      title: "Python for Data Science",
      platform: "NPTEL",
      year: "2025",
      icon: "📈",
      color: "from-red-500 to-pink-500"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(certifications.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(certifications.length / 3)) % Math.ceil(certifications.length / 3));
  };

  const visibleCerts = certifications.slice(currentIndex * 3, (currentIndex + 1) * 3);

  return (
    <section id="certifications" className="py-20 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto rounded-full" />
        </motion.div>

        {/* Slider Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center space-x-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-3 rounded-full bg-dark-card border border-dark-border hover:border-neon-purple transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-neon-purple" />
          </motion.button>
          
          <span className="text-gray-300">
            {currentIndex + 1} / {Math.ceil(certifications.length / 3)}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-3 rounded-full bg-dark-card border border-dark-border hover:border-neon-purple transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-neon-purple" />
          </motion.button>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="wait">
            {visibleCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="glass-effect rounded-xl p-6 border border-dark-border hover:border-neon-purple/50 transition-all duration-300 cursor-pointer"
              >
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${cert.color} flex items-center justify-center mx-auto text-2xl`}>
                    {cert.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-3">
                      {cert.title}
                    </h3>
                    <p className="text-neon-purple font-medium text-sm mb-2">
                      {cert.platform}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.year}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 border border-neon-purple text-neon-purple rounded-lg hover:bg-neon-purple hover:text-white transition-colors text-sm mx-auto"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Certificate</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Certification Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="glass-effect rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">
              Certification Summary
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">{certifications.length}</div>
                <div className="text-sm text-gray-300">Total Certifications</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">8</div>
                <div className="text-sm text-gray-300">Platforms</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">3</div>
                <div className="text-sm text-gray-300">Years</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">100%</div>
                <div className="text-sm text-gray-300">Completion Rate</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications; 