import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X, Code, Gamepad2, Calculator, Zap } from 'lucide-react';
import TiltCard from './TiltCard';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ComponentType<any>;
  color: string;
  accentColor: string;
  github: string;
  live: string;
  status: string;
}

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [revealPhase, setRevealPhase] = useState<'closed' | 'opening' | 'open'>('closed');

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setRevealPhase('opening');
    setTimeout(() => setRevealPhase('open'), 50);
  };

  const handleCloseProject = () => {
    setRevealPhase('closed');
    setTimeout(() => setSelectedProject(null), 350);
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Cargo Opus",
      description: "A comprehensive cargo management system built with TypeScript, featuring advanced logistics tracking and real-time updates.",
      technologies: ["TypeScript", "React", "Node.js", "MongoDB"],
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      accentColor: "rgba(0,180,216,0.2)",
      github: "#",
      live: "#",
      status: "WIP"
    },
    {
      id: 2,
      title: "Tetris Blocks",
      description: "A fun and interactive Tetris game with modern animations and smooth gameplay experience.",
      technologies: ["HTML", "CSS", "JavaScript", "Canvas API"],
      icon: Gamepad2,
      color: "from-green-500 to-emerald-500",
      accentColor: "rgba(52,211,153,0.2)",
      github: "#",
      live: "#",
      status: "Live"
    },
    {
      id: 3,
      title: "Tic Tac Toe",
      description: "Classic Tic Tac Toe game with AI opponent using minimax algorithm and a polished dark UI.",
      technologies: ["Python", "Tkinter", "AI / Minimax"],
      icon: Zap,
      color: "from-violet-500 to-purple-400",
      accentColor: "rgba(139,92,246,0.2)",
      github: "#",
      live: "#",
      status: "Live"
    },
    {
      id: 4,
      title: "Calculator",
      description: "A fully functional calculator with advanced scientific functions and a sleek dark interface.",
      technologies: ["Python", "Tkinter", "Math Library"],
      icon: Calculator,
      color: "from-orange-500 to-amber-400",
      accentColor: "rgba(251,146,60,0.2)",
      github: "#",
      live: "#",
      status: "Live"
    },
  ];

  return (
    <section id="projects" className="py-20 relative nebula-bg">
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
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <TiltCard
              key={project.id}
              className="glass-effect rounded-2xl p-6 border border-dark-border hover:border-cosmic-cyan/40 transition-colors cursor-pointer"
              onClick={() => handleOpenProject(project)}
              maxTilt={6}
              scale={1.02}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                {/* Icon + title + status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mr-3 shadow-lg`}
                      style={{ boxShadow: `0 0 16px ${project.accentColor}` }}
                    >
                      <project.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full border font-mono"
                    style={{
                      borderColor: project.status === 'Live' ? 'rgba(34,211,238,0.4)' : 'rgba(251,146,60,0.4)',
                      color:       project.status === 'Live' ? '#22d3ee'              : '#fb923c',
                      background:  project.status === 'Live' ? 'rgba(34,211,238,0.08)': 'rgba(251,146,60,0.08)',
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="skill-chip">{tech}</span>
                  ))}
                </div>

                {/* Hint row */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-dark-card/80 border border-dark-border rounded-lg text-slate-400 hover:text-cosmic-cyan hover:border-cosmic-cyan/40 transition-all text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </button>
                    <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-dark-border rounded-lg text-slate-400 hover:text-cosmic-cyan hover:border-cosmic-cyan/40 transition-all text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live</span>
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 italic">Click card to explore â†’</span>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* â”€â”€ Cinematic Project Modal â”€â”€ */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: 'rgba(3,8,16,0.85)', backdropFilter: 'blur(8px)' }}
              onClick={handleCloseProject}
            >
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.82, y: 28 }}
                animate={
                  revealPhase === 'open'
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.82, y: 28 }
                }
                exit={{ opacity: 0, scale: 0.88, y: 20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="glass-effect-bright rounded-2xl p-8 max-w-2xl w-full max-h-[88vh] overflow-y-auto relative"
                style={{
                  border: `1px solid ${selectedProject.accentColor.replace('0.2)', '0.4)')}`,
                  boxShadow: `0 0 48px ${selectedProject.accentColor}, 0 24px 48px rgba(0,0,0,0.7)`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${selectedProject.color} opacity-60 rounded-t-2xl`}
                />

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedProject.color} flex items-center justify-center mr-4 shadow-lg`}
                      style={{ boxShadow: `0 0 24px ${selectedProject.accentColor}` }}
                    >
                      <selectedProject.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                      <span
                        className="text-xs font-mono"
                        style={{ color: selectedProject.status === 'Live' ? '#22d3ee' : '#fb923c' }}
                      >
                        â— {selectedProject.status}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={handleCloseProject}
                    className="text-slate-400 hover:text-white transition-colors p-1.5"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">{selectedProject.description}</p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="skill-chip">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <motion.a
                    href={selectedProject.github}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-electric-blue to-cosmic-violet text-white text-sm font-semibold rounded-xl shadow-[0_0_16px_rgba(0,180,216,0.3)]"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.live}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center space-x-2 px-5 py-2.5 border border-cosmic-cyan/40 text-cosmic-cyan text-sm font-semibold rounded-xl hover:bg-cosmic-cyan/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
