import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Users, Wrench } from 'lucide-react';
import { useSpace } from '../context/SpaceContext';

/* â”€â”€â”€ Warp burst: CSS tails that radiate from center â”€â”€â”€ */
const WarpBurst: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return (
    <div className="warp-container" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * 360;
        const top   = 50 + Math.sin((angle * Math.PI) / 180) * 40;
        const left  = 50 + Math.cos((angle * Math.PI) / 180) * 45;
        const len   = 60 + Math.random() * 80;
        const delay = i * 0.03;
        return (
          <div
            key={i}
            className="warp-line"
            style={{
              top:    `${top}%`,
              left:   `${left}%`,
              width:  `${len}px`,
              transform: `rotate(${angle}deg)`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

const Skills = () => {
  const { triggerWarp } = useSpace();
  const warpFired = useRef(false);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [warpRef, warpInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [showWarp, setShowWarp] = React.useState(false);

  // Fire warp once when section enters viewport
  useEffect(() => {
    if (warpInView && !warpFired.current) {
      warpFired.current = true;
      setShowWarp(true);
      triggerWarp(); // also animate the canvas starfield
      const timer = setTimeout(() => setShowWarp(false), 900);
      return () => clearTimeout(timer);
    }
  }, [warpInView, triggerWarp]);

  const skillCategories = [
    {
      title: "Programming",
      icon: Code,
      skills: ["Python", "Java", "HTML", "CSS", "JavaScript", "SQL", "C"],
      color: "from-blue-500 to-cyan-500",
      accent: "rgba(34,211,238,0.2)",
    },
    {
      title: "Tools",
      icon: Wrench,
      skills: ["Jupyter", "VS Code", "Git", "GitHub", "OpenStego", "Spyder", "PowerBI"],
      color: "from-emerald-500 to-green-400",
      accent: "rgba(52,211,153,0.2)",
    },
    {
      title: "AI / ML",
      icon: Brain,
      skills: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "R"],
      color: "from-violet-500 to-purple-400",
      accent: "rgba(139,92,246,0.2)",
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: ["Problem-solving", "Teamwork", "Communication"],
      color: "from-orange-500 to-amber-400",
      accent: "rgba(251,146,60,0.2)",
    },
  ];

  const proficiencies = [
    { skill: "Python",           level: 90 },
    { skill: "Machine Learning", level: 85 },
    { skill: "Data Analysis",    level: 80 },
    { skill: "SQL",              level: 75 },
    { skill: "Java",             level: 70 },
    { skill: "JavaScript",       level: 65 },
    { skill: "HTML / CSS",       level: 80 },
    { skill: "Git / GitHub",     level: 75 },
  ];

  return (
    <section id="skills" className="py-20 relative nebula-bg overflow-hidden" ref={warpRef}>
      {/* Warp burst overlay */}
      <WarpBurst active={showWarp} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
          <div className="section-divider" />
        </motion.div>

        {/* Skill category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ scale: 1.04, y: -8 }}
              className="glass-effect rounded-2xl p-6 border border-dark-border hover:border-cosmic-cyan/40 transition-colors duration-300"
              style={{ boxShadow: `0 4px 24px ${category.accent}, 0 0 0 0 transparent` }}
            >
              <div className="flex items-center mb-5">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mr-3 shadow-lg`}
                >
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-2.5">
                {category.skills.map((skill, si) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 + si * 0.04 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-cosmic-cyan rounded-full group-hover:opacity-100 opacity-60 transition-opacity" />
                    <span className="text-slate-300 text-sm group-hover:text-cosmic-cyan transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Skill{' '}
            <span className="gradient-text-blue">Proficiency</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {[proficiencies.slice(0, 4), proficiencies.slice(4)].map((group, gi) => (
              <div key={gi} className="space-y-5">
                {group.map((item, i) => (
                  <motion.div
                    key={item.skill}
                    initial={{ opacity: 0, x: gi === 0 ? -40 : 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.6 + i * 0.1 }}
                    className="space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-200 font-medium text-sm">{item.skill}</span>
                      <span className="text-cosmic-cyan font-mono text-xs">{item.level}%</span>
                    </div>
                    <div className="w-full bg-dark-card rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${item.level}%` } : {}}
                        transition={{ duration: 1.1, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-electric-blue to-cosmic-violet rounded-full"
                        style={{ boxShadow: '0 0 8px rgba(0,180,216,0.5)' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
