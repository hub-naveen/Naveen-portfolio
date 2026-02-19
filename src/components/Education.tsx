import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

/* â”€â”€â”€ Gravity cursor hook â”€â”€â”€ */
function useGravityField(sectionRef: React.RefObject<HTMLElement>, active: boolean) {
  useEffect(() => {
    if (!active) return;

    const section = sectionRef.current;
    if (!section) return;

    const gravNodes = section.querySelectorAll<HTMLElement>('[data-gravity]');
    if (!gravNodes.length) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let rafId: number;
    const targets: { el: HTMLElement; cx: number; cy: number; x: number; y: number }[] = [];

    const buildTargets = () => {
      targets.length = 0;
      gravNodes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        targets.push({
          el,
          cx: rect.left + rect.width  / 2,
          cy: rect.top  + rect.height / 2,
          x: 0,
          y: 0,
        });
      });
    };

    buildTargets();
    window.addEventListener('resize', buildTargets);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    section.addEventListener('mousemove', onMouseMove, { passive: true });

    const MAX_DIST  = 260;
    const MAX_SHIFT = 9;
    const EASE      = 0.07;

    const animate = () => {
      targets.forEach((t) => {
        const rect = t.el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = mouseX - cx;
        const dy   = mouseY - cy;
        const dist = Math.hypot(dx, dy);

        const factor = Math.max(0, 1 - dist / MAX_DIST);
        const targetX = factor * (dx / dist || 0) * MAX_SHIFT;
        const targetY = factor * (dy / dist || 0) * MAX_SHIFT;

        t.x += (targetX - t.x) * EASE;
        t.y += (targetY - t.y) * EASE;

        if (Math.abs(t.x) > 0.05 || Math.abs(t.y) > 0.05) {
          t.el.style.transform = `translate(${t.x.toFixed(2)}px, ${t.y.toFixed(2)}px)`;
        }
      });
      rafId = requestAnimationFrame(animate);
    };

    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    section.addEventListener('mouseleave', onMouseLeave);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener('mousemove',  onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', buildTargets);
      // Reset transforms
      targets.forEach((t) => { t.el.style.transform = ''; });
    };
  }, [active, sectionRef]);
}

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [gravRef, gravInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  // Merge refs helper
  const setRefs = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    if (typeof gravRef === 'function') gravRef(el);
  };

  useGravityField(sectionRef, gravInView);

  const education = {
    institution: "DMI College of Engineering",
    degree: "B.Tech Artificial Intelligence and Data Science",
    year: "2023â€“2027",
    cgpa: "9.6",
    achievement: "College Topper",
    location: "Chennai, Tamil Nadu"
  };

  return (
    <section
      id="education"
      ref={(el) => { setRefs(el); (ref as any)(el); }}
      className="py-20 relative nebula-bg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="section-divider" />
          <p className="text-sm text-electric-blue/50 mt-4 tracking-widest uppercase font-mono">
            Move cursor near elements to feel the pull
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-cosmic-cyan via-cosmic-violet to-transparent opacity-40" />

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-effect rounded-2xl p-8 max-w-2xl relative card-glow"
              data-gravity
              style={{ willChange: 'transform' }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-4 top-8 w-8 h-8 bg-gradient-to-br from-cosmic-cyan to-cosmic-violet rounded-full border-4 border-dark-bg flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.5)]">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>

              <div className="space-y-6">
                {/* Institution Header */}
                <div className="text-center" data-gravity>
                  <h3 className="text-2xl font-bold text-white mb-2">{education.institution}</h3>
                  <div className="flex items-center justify-center space-x-4 text-slate-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-cosmic-cyan" />
                      <span className="text-sm">{education.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-cosmic-cyan" />
                      <span className="text-sm">{education.year}</span>
                    </div>
                  </div>
                </div>

                {/* Degree Info */}
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-cosmic-cyan mb-2">{education.degree}</h4>
                  <p className="text-slate-400">Bachelor of Technology in Artificial Intelligence and Data Science</p>
                </div>

                {/* Achievement Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8, type: 'spring', stiffness: 200 }}
                  className="flex justify-center"
                  data-gravity
                >
                  <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cosmic-violet to-electric-blue rounded-full shadow-[0_0_20px_rgba(139,92,246,0.35)]">
                    <Award className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">{education.achievement} Â· CGPA: {education.cgpa}</span>
                  </div>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {[
                    { value: education.cgpa, label: 'CGPA' },
                    { value: '3rd',          label: 'Year'  },
                    { value: 'Top',          label: 'Rank'  },
                  ].map(({ value, label }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                      className="text-center p-4 rounded-xl bg-dark-card/60 border border-dark-border hover:border-cosmic-cyan/40 transition-colors"
                      data-gravity
                      style={{ willChange: 'transform' }}
                    >
                      <div className="text-3xl font-bold gradient-text-blue mb-1">{value}</div>
                      <div className="text-sm text-slate-400">{label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Coursework */}
                <div className="mt-8">
                  <h5 className="text-lg font-semibold text-white mb-4 text-center">Key Coursework</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      "Machine Learning", "Data Structures", "Python Programming", "Statistics",
                      "Database Systems", "Web Development", "AI Algorithms", "Data Visualization"
                    ].map((course, i) => (
                      <motion.div
                        key={course}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 1.3 + i * 0.05 }}
                        className="text-center p-2 rounded-lg bg-dark-card/40 border border-dark-border hover:border-cosmic-cyan/30 transition-colors"
                        data-gravity
                        style={{ willChange: 'transform' }}
                      >
                        <span className="text-xs text-slate-300">{course}</span>
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
