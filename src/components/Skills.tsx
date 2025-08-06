import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Users, Wrench } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Programming",
      icon: Code,
      skills: ["Python", "Java", "HTML", "CSS", "JavaScript", "SQL", "C"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Tools",
      icon: Wrench,
      skills: ["Jupyter", "VS Code", "Git", "GitHub", "OpenStego", "Spyder", "PowerBI"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "AI/ML",
      icon: Brain,
      skills: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "R"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: ["Problem-solving", "Teamwork", "Communication"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-effect rounded-xl p-6 border border-dark-border hover:border-neon-purple/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mr-3`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: (index * 0.1) + (skillIndex * 0.05) }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-neon-purple rounded-full" />
                    <span className="text-gray-300 hover:text-neon-purple transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Skill Proficiency
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { skill: "Python", level: 90 },
                { skill: "Machine Learning", level: 85 },
                { skill: "Data Analysis", level: 80 },
                { skill: "SQL", level: 75 }
              ].map((item, index) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + (index * 0.1) }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{item.skill}</span>
                    <span className="text-neon-purple font-mono">{item.level}%</span>
                  </div>
                  <div className="w-full bg-dark-card rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${item.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                      className="h-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              {[
                { skill: "Java", level: 70 },
                { skill: "JavaScript", level: 65 },
                { skill: "HTML/CSS", level: 80 },
                { skill: "Git/GitHub", level: 75 }
              ].map((item, index) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + (index * 0.1) }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{item.skill}</span>
                    <span className="text-neon-purple font-mono">{item.level}%</span>
                  </div>
                  <div className="w-full bg-dark-card rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${item.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                      className="h-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 