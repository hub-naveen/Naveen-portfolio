import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download, ExternalLink } from 'lucide-react';

/* â”€â”€â”€ Constellation overlay â”€â”€â”€ */
interface Node { x: number; y: number }

const ConstellationOverlay: React.FC<{ nodes: Node[]; onDone: () => void }> = ({ nodes, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 4500);
    return () => clearTimeout(t);
  }, [onDone]);

  if (nodes.length < 2) return null;

  // Build edges: connect each node to 2 nearest others
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    const dists = nodes
      .map((b, j) => ({ j, d: Math.hypot(b.x - a.x, b.y - a.y) }))
      .filter(({ j }) => j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 2);
    dists.forEach(({ j }) => {
      if (!edges.some(([p, q]) => (p === i && q === j) || (p === j && q === i))) {
        edges.push([i, j]);
      }
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20,
        overflow: 'hidden',
      }}
    >
      <svg
        className="constellation-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {edges.map(([i, j], ei) => (
          <line
            key={ei}
            className="constellation-line"
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            style={{ animationDelay: `${ei * 0.18}s` }}
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            className="constellation-node"
            cx={n.x}
            cy={n.y}
            r="0.6"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </svg>
      {/* Fade-out vignette at end */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        style={{ position: 'absolute', inset: 0, background: 'transparent' }}
      />
    </motion.div>
  );
};

/* â”€â”€â”€ Main Component â”€â”€â”€ */
const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constellation state
  const [headingClicks, setHeadingClicks] = useState(0);
  const [showConstellation, setShowConstellation] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [constellationNodes, setConstellationNodes] = useState<Node[]>([]);
  const clickResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Constellation trigger: triple-click heading
  const handleHeadingClick = useCallback(() => {
    if (clickResetTimer.current) clearTimeout(clickResetTimer.current);
    const next = headingClicks + 1;
    if (next >= 3) {
      setHeadingClicks(0);
      // Capture positions of contact cards relative to section
      if (sectionRef.current) {
        const sRect = sectionRef.current.getBoundingClientRect();
        const items = sectionRef.current.querySelectorAll<HTMLElement>('[data-constellation-node]');
        const nodes: Node[] = Array.from(items).map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: ((r.left + r.width  / 2 - sRect.left) / sRect.width)  * 100,
            y: ((r.top  + r.height / 2 - sRect.top)  / sRect.height) * 100,
          };
        });
        setConstellationNodes(nodes);
        setShowConstellation(true);
      }
    } else {
      setHeadingClicks(next);
      // Auto-reset if no more clicks in 1.5s
      clickResetTimer.current = setTimeout(() => setHeadingClicks(0), 1500);
    }
  }, [headingClicks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail,   label: "Email",    value: "itzmenavin07@gmail.com", link: "mailto:itzmenavin07@gmail.com" },
    { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu",    link: "#" },
    { icon: Phone,  label: "Phone",    value: "+91 98765 43210",        link: "tel:+919876543210" },
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/1naveen",  icon: Linkedin, color: "from-blue-500 to-blue-600" },
    { name: "GitHub",   url: "https://github.com/hub-naveen",        icon: Github,   color: "from-slate-700 to-slate-900" },
    { name: "Resume",   url: "/resume.pdf",                          icon: Download, color: "from-emerald-500 to-green-600" },
  ];

  return (
    <section
      id="contact"
      ref={(el) => {
        (ref as any)(el);
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="py-20 relative nebula-bg"
    >
      {/* Constellation overlay */}
      <AnimatePresence>
        {showConstellation && (
          <ConstellationOverlay
            nodes={constellationNodes}
            onDone={() => setShowConstellation(false)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header â€” triple-click to activate constellation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 select-none"
            onClick={handleHeadingClick}
            title="Triple-click for a surprise âœ¨"
            style={{ cursor: 'default' }}
          >
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="section-divider" />
          {headingClicks > 0 && headingClicks < 3 && (
            <p className="text-xs text-cosmic-cyan/40 mt-3 font-mono tracking-widest">
              {3 - headingClicks} more click{3 - headingClicks !== 1 ? 's' : ''} to reveal the constellationâ€¦
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect rounded-2xl p-8 border border-dark-border"
            data-constellation-node
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {(['name', 'email'] as const).map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-slate-400 mb-2 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-slate-500 focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/30 transition-all duration-300 outline-none"
                    placeholder={field === 'email' ? 'your.email@example.com' : 'Your name'}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-slate-500 focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/30 transition-all duration-300 resize-none outline-none"
                  placeholder="Your messageâ€¦"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-electric-blue to-cosmic-violet text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,180,216,0.3)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sendingâ€¦</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="glass-effect rounded-2xl p-8 border border-dark-border" data-constellation-node>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={info.label}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-dark-card/50 border border-dark-border hover:border-cosmic-cyan/40 transition-all duration-300"
                    data-constellation-node
                  >
                    <div className="w-11 h-11 bg-gradient-to-br from-electric-blue to-cosmic-violet rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(0,180,216,0.3)]">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{info.label}</p>
                      <p className="text-white font-medium text-sm">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect rounded-2xl p-8 border border-dark-border" data-constellation-node>
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-dark-card/50 border border-dark-border hover:border-cosmic-cyan/40 transition-all duration-300 group"
                    data-constellation-node
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-11 h-11 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <social.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{social.name}</p>
                        <p className="text-xs text-slate-400">Click to visit</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cosmic-cyan transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '24/7', label: 'Available' },
                { value: '< 1h', label: 'Response Time' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-5 rounded-xl bg-dark-card/50 border border-dark-border hover:border-cosmic-cyan/30 transition-colors"
                  data-constellation-node
                >
                  <div className="text-2xl font-bold gradient-text-blue mb-1">{value}</div>
                  <div className="text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
