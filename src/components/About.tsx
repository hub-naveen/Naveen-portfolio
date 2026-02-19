import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Award, MapPin, GraduationCap } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 relative nebula-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image/Icon */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-80 h-80 rounded-full border border-cosmic-violet/30 flex items-center justify-center"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1), rgba(0,180,216,0.05))' }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-64 h-64 rounded-full border border-cosmic-violet/40 flex items-center justify-center"
                  style={{ background: 'var(--space-card)' }}
                >
                  <User className="w-32 h-32 text-cosmic-cyan" />
                </motion.div>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-neon-purple rounded-full flex items-center justify-center"
              >
                <Award className="w-4 h-4 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-neon-pink rounded-full flex items-center justify-center"
              >
                <GraduationCap className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Who I Am
              </h3>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                I'm a 3rd-year B.Tech AI & Data Science student at DMI College of Engineering (2023–2027), 
                with a CGPA of 9.6 and proud to be the college topper. My passion lies in machine learning, 
                data analytics, and building intelligent systems that can make a real impact.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-dark-card/50 border border-dark-border"
                >
                  <MapPin className="w-5 h-5 text-neon-purple" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white font-medium">Chennai, Tamil Nadu</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-dark-card/50 border border-dark-border"
                >
                  <GraduationCap className="w-5 h-5 text-neon-purple" />
                  <div>
                    <p className="text-sm text-gray-400">Education</p>
                    <p className="text-white font-medium">B.Tech AI & DS</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-dark-card/50 border border-dark-border"
                >
                  <Award className="w-5 h-5 text-neon-purple" />
                  <div>
                    <p className="text-sm text-gray-400">CGPA</p>
                    <p className="text-white font-medium">9.6 (College Topper)</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-dark-card/50 border border-dark-border"
                >
                  <User className="w-5 h-5 text-neon-purple" />
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-white font-medium">3rd Year Student</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 border border-neon-purple/20"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">9.6</div>
                <div className="text-sm text-gray-300">CGPA</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 border border-neon-purple/20"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">4+</div>
                <div className="text-sm text-gray-300">Internships</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 border border-neon-purple/20"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">10+</div>
                <div className="text-sm text-gray-300">Certifications</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 