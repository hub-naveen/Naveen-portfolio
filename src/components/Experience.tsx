import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, ExternalLink, Building2, Users, Video } from 'lucide-react';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState('internships');

  const experiences = {
    internships: [
      {
        id: 1,
        role: "Python Full Stack Developer",
        company: "Femtosoft Technologies",
        duration: "1 Month (On-Site)",
        description: "Developed full-stack applications using Python and modern web technologies.",
        icon: Building2,
        color: "from-blue-500 to-cyan-500"
      },
      {
        id: 2,
        role: "Data Science and Machine Learning",
        company: "Edunet Foundation",
        duration: "1 Month (Online)",
        description: "Worked on machine learning projects and data analysis tasks.",
        icon: Building2,
        color: "from-green-500 to-emerald-500"
      },
      {
        id: 3,
        role: "Data Science Intern",
        company: "Cognifyz Technology",
        duration: "1 Month (Online)",
        description: "Applied data science techniques to solve real-world problems.",
        icon: Building2,
        color: "from-purple-500 to-pink-500"
      },
      {
        id: 4,
        role: "Machine Learning Intern",
        company: "OneYes Solution",
        duration: "1 Month (On-Site)",
        description: "Developed and deployed machine learning models for business applications.",
        icon: Building2,
        color: "from-orange-500 to-red-500"
      }
    ],
    partTime: [
      {
        id: 1,
        role: "Online Tutor",
        company: "SmartTech Junior",
        duration: "1 Month",
        description: "Teaching online classes in Scratch, HTML, and Python programming.",
        icon: Users,
        color: "from-indigo-500 to-purple-500"
      },
      {
        id: 2,
        role: "Content Creator",
        company: "SmartTech Junior",
        duration: "6 Months",
        description: "Creating educational videos and content for programming tutorials.",
        icon: Video,
        color: "from-pink-500 to-rose-500"
      }
    ],
    freelance: [
      {
        id: 1,
        role: "Video Editing",
        company: "LV Prasad Studio, Vadapalani",
        duration: "1 Week",
        description: "Professional video editing and post-production work for studio projects.",
        icon: Video,
        color: "from-yellow-500 to-orange-500"
      }
    ]
  };

  const tabs = [
    { id: 'internships', label: 'Internships', count: experiences.internships.length },
    { id: 'partTime', label: 'Part-time', count: experiences.partTime.length },
    { id: 'freelance', label: 'Freelance', count: experiences.freelance.length }
  ];

  return (
    <section id="experience" className="py-20 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto rounded-full" />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-2 bg-dark-card rounded-lg p-2 border border-dark-border">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-neon-purple text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-dark-border'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {experiences[activeTab as keyof typeof experiences].map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect rounded-xl p-6 border border-dark-border hover:border-neon-purple/50 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${exp.color} flex items-center justify-center flex-shrink-0`}>
                  <exp.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-neon-purple font-medium">
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Chennai, TN</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 border border-neon-purple text-neon-purple rounded-lg hover:bg-neon-purple hover:text-white transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Details</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">
              Experience Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">4</div>
                <div className="text-sm text-gray-300">Internships</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">2</div>
                <div className="text-sm text-gray-300">Part-time Roles</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="text-center p-4 rounded-lg bg-dark-card/50 border border-dark-border"
              >
                <div className="text-3xl font-bold text-neon-purple mb-2">1</div>
                <div className="text-sm text-gray-300">Freelance Project</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 