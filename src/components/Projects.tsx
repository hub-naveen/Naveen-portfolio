import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X, Code, Gamepad2, Calculator } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ComponentType<any>;
  color: string;
  github: string;
  live: string;
}

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Cargo Opus",
      description: "A comprehensive cargo management system built with TypeScript, featuring advanced logistics tracking and real-time updates.",
      technologies: ["TypeScript", "React", "Node.js", "MongoDB"],
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      github: "#",
      live: "#"
    },
    {
      id: 2,
      title: "Tetris Blocks",
      description: "A fun and interactive Tetris game with modern animations and smooth gameplay experience.",
      technologies: ["HTML", "CSS", "JavaScript", "Canvas API"],
      icon: Gamepad2,
      color: "from-green-500 to-emerald-500",
      github: "#",
      live: "#"
    },
    {
      id: 3,
      title: "Tic Tac Toe",
      description: "Classic Tic Tac Toe game with AI opponent and beautiful UI design.",
      technologies: ["Python", "Tkinter", "AI Algorithms"],
      icon: Gamepad2,
      color: "from-purple-500 to-pink-500",
      github: "#",
      live: "#"
    },
    {
      id: 4,
      title: "Calculator",
      description: "A fully functional calculator with advanced mathematical operations and scientific functions.",
      technologies: ["Python", "Tkinter", "Math Library"],
      icon: Calculator,
      color: "from-orange-500 to-red-500",
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect rounded-xl p-6 border border-dark-border hover:border-neon-purple/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center mr-3`}>
                  <project.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-dark-card border border-dark-border rounded-full text-xs text-neon-purple"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/80 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">Code</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 border border-neon-purple text-neon-purple rounded-lg hover:bg-neon-purple hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Live</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-effect rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedProject.color} flex items-center justify-center mr-3`}>
                      <selectedProject.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-dark-card border border-neon-purple/30 rounded-full text-sm text-neon-purple"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/80 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 border border-neon-purple text-neon-purple rounded-lg hover:bg-neon-purple hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
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