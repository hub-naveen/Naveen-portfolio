import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = {
    institution: "DMI College of Engineering",
    degree: "B.Tech Artificial Intelligence and Data Science",
    year: "2023–2027",
    cgpa: "9.6",
    achievement: "College Topper",
    location: "Chennai, Tamil Nadu"
  };

  return (
    <section id="education" className="py-20 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto rounded-full" />
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-purple to-neon-pink" />
            
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect rounded-xl p-8 max-w-2xl relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-4 top-8 w-8 h-8 bg-neon-purple rounded-full border-4 border-dark-bg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>

              <div className="space-y-6">
                {/* Institution Header */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {education.institution}
                  </h3>
                  <div className="flex items-center justify-center space-x-4 text-gray-300">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{education.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{education.year}</span>
                    </div>
                  </div>
                </div>

                {/* Degree Info */}
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-neon-purple mb-2">
                    {education.degree}
                  </h4>
                  <p className="text-gray-300">
                    Bachelor of Technology in Artificial Intelligence and Data Science
                  </p>
                </div>

                {/* Achievement Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex justify-center"
                >
                  <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full">
                    <Award className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">
                      {education.achievement} - CGPA: {education.cgpa}
                    </span>
                  </div>
                </motion.div>

                {/* Key Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
                  >
                    <div className="text-3xl font-bold text-neon-purple mb-2">
                      {education.cgpa}
                    </div>
                    <div className="text-sm text-gray-300">CGPA</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
                  >
                    <div className="text-3xl font-bold text-neon-purple mb-2">
                      3rd
                    </div>
                    <div className="text-sm text-gray-300">Year</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
                  >
                    <div className="text-3xl font-bold text-neon-purple mb-2">
                      Top
                    </div>
                    <div className="text-sm text-gray-300">Rank</div>
                  </motion.div>
                </div>

                {/* Course Highlights */}
                <div className="mt-8">
                  <h5 className="text-lg font-semibold text-white mb-4 text-center">
                    Key Coursework
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      "Machine Learning",
                      "Data Structures",
                      "Python Programming",
                      "Statistics",
                      "Database Systems",
                      "Web Development",
                      "AI Algorithms",
                      "Data Visualization"
                    ].map((course, index) => (
                      <motion.div
                        key={course}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 1.3 + (index * 0.05) }}
                        className="text-center p-2 rounded-lg bg-dark-card/30 border border-dark-border"
                      >
                        <span className="text-xs text-gray-300">{course}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education; 