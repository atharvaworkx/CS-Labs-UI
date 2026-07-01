import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaUsers,
  FaBookOpen,
  FaCode,
  FaArrowRight,
  FaFlask,
  FaGraduationCap,
  FaRocket,
  FaCheckCircle,
  FaStar,
  FaDiscord,
  FaTools,
  FaPlayCircle
} from 'react-icons/fa';
import StudentIllustration from './StudentIllustration';
import Footer from './Footer';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navLockRef = useRef(false);

  const manifestoSections = [
    {
      title: '1. Our Core Philosophy: Beyond the Rat-Race',
      items: [
        'We challenge students to assess their true career readiness versus blind job-hunting.',
        'We believe that merely securing a job is not enough; students must possess the rigorous software engineering foundations required to sustain and scale their careers day in and day out.',
        'We shift the focus from superficially learning language syntax (the "resume-padding" trap) to mastering enterprise-level best practices and securing globally recognized credentials.',
        'We provide the space and guidance for students to discover their true trajectory—whether that is top-tier industry placement, teaching, or higher education (GATE)—without succumbing to peer pressure.'
      ]
    },
    {
      title: '2. The Open Learning Community',
      items: [
        'We are building a free, inclusive community for ambitious students from the second year onwards, across all branches and degree levels.',
        'There are absolutely no joining or annual fees to participate in the general community hub.',
        'We host hybrid discussion platforms for academic subjects, exam strategies, and complex problem-solving.',
        'We provide accessible, premium tutoring for highly complex CS/IT/AI/ML subjects.',
        'We challenge our members to solve real-world problems under strict expert guidance.'
      ]
    },
    {
      title: '3. The Incubation Roadmap',
      subtitle: 'Phase 1: Active Tracks (Currently Enrolling)',
      items: [
        'Track A: Elite GATE Mentorship & Software Lab',
        'Students collaborate to build interactive GATE visualizations (e.g., ToC state machines).',
        'Developers utilize agile feedback loops, testing features with live user groups before wider public releases.',
        'The upcoming platform will integrate AI-assisted subject materials, expert doubt-resolution modules, and predictive PYQ scoring systems.'
      ],
      futureTitle: 'Phase 2: Future Expansion (Upcoming Semester)',
      futureTracks: [
        {
          title: 'Track B: Industry Certification & Enterprise Mastery',
          items: [
            'We will bridge the gap between academic programming and industry expectations by rigorously preparing students for globally recognized credentials.',
            'The upcoming curriculum will move far beyond basic coding to embed elite software development methodologies, including Test-Driven Development (TDD) and Clean Code architecture.'
          ]
        },
        {
          title: 'Track C: Technical Research & Publication',
          items: [
            'Students will conduct deep-dive research on complex Computer Science topics.',
            'Drafts and architecture designs are rigorously validated by industry experts.',
            'Finalized articles will be published on platforms like Hashnode and Medium to build public, verifiable portfolios.'
          ]
        },
        {
          title: 'Track D: Python & ML Intensive Bootcamps',
          items: [
            'Planned high-impact technical workflows designed to build immediate momentum through structured Basic, Intermediate, and Advanced project phases.',
            'Training includes expert-prepared study materials, live assignments, and strict scoring rubrics.'
          ]
        }
      ]
    },
    {
      title: '4. Tangible Student Benefits',
      items: [
        'Students gain hands-on "Learn by Doing" experience with real technology and enterprise-grade workflows.',
        'Verified Expertise: Graduating with globally recognized industry certifications allows students to bypass standard fresher screening and drastically boosts interview conversion rates.',
        'Independent research builds unshakeable technical confidence.',
        'Contributions yield direct credits for their resumes, GitHub profiles, and digital portfolios.',
        'Students enter the job market with actual project leverage and proven methodologies (like TDD), ensuring they don\'t just secure jobs, but thrive in them.'
      ]
    }
  ];

  const pillars = [
    {
      icon: FaUsers,
      title: 'The Community',
      copy: 'Free, open hub for problem-solving and disciplined peer learning.',
      cta: 'Join the Discord/Forum',
      target: '#community'
    },
    {
      icon: FaGraduationCap,
      title: 'The Incubator',
      copy: 'Structured tracks for GATE, ML, and enterprise development.',
      cta: 'Apply for Track A',
      target: '#tracks'
    },
    {
      icon: FaFlask,
      title: 'The Labs',
      copy: 'Interactive tools built by students, for students.',
      cta: 'Try the Visualizer',
      target: '#labs'
    }
  ];

  const communityFeatures = [
    'Daily problem-solving threads and review sessions',
    'Peer accountability for ambitious learners',
    'Open access to curated discussions and study routines'
  ];

  const trackFeatures = [
    'Track A is live now for elite GATE mentorship',
    'Future tracks will expand into ML and product engineering',
    'Admission is selective so the cohort stays focused'
  ];

  const labCards = [
    {
      icon: FaCode,
      title: 'Visualizer',
      copy: 'Interactive state and flow exploration for core CS concepts.'
    },
    {
      icon: FaTools,
      title: 'Study Toolkit',
      copy: 'Practical utilities that support deliberate practice.'
    },
    {
      icon: FaPlayCircle,
      title: 'Live Demos',
      copy: 'Hands-on demonstrations that keep the learning loop active.'
    }
  ];

  useEffect(() => {
    const sectionId = location.hash.replace('#', '') || 'home';
    const target = document.getElementById(sectionId);

    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.hash]);

  useEffect(() => {
    const container = document.querySelector('.home-container');

    if (!container) {
      return undefined;
    }

    const sectionIds = ['home', 'manifesto', 'community', 'tracks', 'labs'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .sort((left, right) => left.offsetTop - right.offsetTop);

    const updateActiveSection = () => {
      if (navLockRef.current) {
        return;
      }

      const marker = container.scrollTop + container.clientHeight * 0.25;
      let activeSectionId = 'home';

      for (const section of sections) {
        if (marker >= section.offsetTop) {
          activeSectionId = section.id;
        } else {
          break;
        }
      }

      const nextHash = activeSectionId === 'home' ? '' : `#${activeSectionId}`;
      if (window.location.hash !== nextHash) {
        navigate(nextHash ? `/${nextHash}` : '/', { replace: true });
      }
    };

    updateActiveSection();
    container.addEventListener('scroll', updateActiveSection, { passive: true });

    return () => container.removeEventListener('scroll', updateActiveSection);
  }, []);

  const navigateTo = (hash) => {
    const targetId = hash ? hash.replace('#', '') : 'home';
    const target = document.getElementById(targetId);

    navLockRef.current = true;
    navigate(hash ? `/${hash}` : '/', { replace: true });

    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else if (targetId === 'home') {
      const container = document.querySelector('.home-container');
      container?.scrollTo({ top: 0, behavior: 'auto' });
    }

    window.setTimeout(() => {
      navLockRef.current = false;
    }, 150);
  };

  return (
    <div className="home-container">
      <section id="home" className="home-section hero-section">
        <motion.div
          className="hero-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Elite incubation hub for ambitious computer science students
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Bridge the Gap Between University Curriculum and Elite Industry Competence.
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Join an exclusive incubation hub for software engineering, deep technical research, and elite GATE mentorship.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className="primary-button"
                onClick={() => navigateTo('#tracks')}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Programs
                <FaArrowRight />
              </motion.button>

              <motion.button
                className="secondary-button"
                onClick={() => navigateTo('#manifesto')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Our Story
              </motion.button>
            </motion.div>

            <motion.div
              className="active-track-banner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <FaStar />
              <div>
                <strong>Track A: Elite GATE Mentorship is Now Enrolling</strong>
                <span>Apply now if you want a structured path and high accountability.</span>
              </div>
              <motion.button
                className="banner-button"
                onClick={() => navigateTo('#tracks')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Apply for Track A
              </motion.button>
            </motion.div>
          </div>

          <StudentIllustration />
        </motion.div>
      </section>

      <section id="manifesto" className="home-section manifesto-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">The CS Labs EdTech Founding Manifesto</h2>
            <p className="section-subtitle">Bridging the gap between university curriculum and elite industry competence.</p>
          </motion.div>

          <div className="manifesto-stack">
            {manifestoSections.map((section, index) => (
              <motion.section
                key={section.title}
                className="manifesto-card manifesto-text-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <div className="manifesto-card-header">
                  <h3>{section.title}</h3>
                  {section.subtitle && <p>{section.subtitle}</p>}
                </div>

                <ul className="manifesto-bullet-list">
                  {section.items.map((item) => (
                    <li key={item}>
                      <span className="bullet-marker">&gt;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {section.futureTitle && (
                  <div className="manifesto-future-block">
                    <h4>{section.futureTitle}</h4>
                    <div className="manifesto-future-list">
                      {section.futureTracks.map((track) => (
                        <div key={track.title} className="manifesto-future-card">
                          <h5>• {track.title}</h5>
                          <ul className="manifesto-bullet-list compact">
                            {track.items.map((item) => (
                              <li key={item}>
                                <span className="bullet-marker">&gt;</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="home-section community-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Community</h2>
            <p className="section-subtitle">A free, open-learning hub for problem-solving and collective momentum.</p>
          </motion.div>

          <div className="feature-split">
            <motion.div
              className="feature-panel"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Join the open hub</h3>
              <p>Use the community to ask better questions, share solutions, and build consistency with peers who care about depth.</p>
              <ul className="feature-list">
                {communityFeatures.map((feature) => (
                  <li key={feature}>
                    <FaCheckCircle />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                className="feature-button"
                onClick={() => navigateTo('#tracks')}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
              >
                Join the Discord/Forum <FaDiscord />
              </motion.button>
            </motion.div>

            <div className="pillar-grid compact">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    className="pillar-card compact"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.5 }}
                  >
                    <div className="pillar-icon">
                      <Icon />
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.copy}</p>
                    <button className="pillar-link" onClick={() => navigateTo(pillar.target)}>
                      {pillar.cta}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="tracks" className="home-section tracks-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Incubation Tracks</h2>
            <p className="section-subtitle">Track A is live now. The remaining tracks are future expansion lanes.</p>
          </motion.div>

          <div className="track-grid">
            {trackFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                className={`track-card ${index === 0 ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 15px 40px rgba(106, 13, 37, 0.15)' }}
              >
                <div className="track-badge">Track A</div>
                <h3 className="track-title">{index === 0 ? 'Elite GATE Mentorship' : index === 1 ? 'ML and Research Expansion' : 'Enterprise Dev Pathways'}</h3>
                <p className="track-desc">{feature}</p>
                <button className="track-button" onClick={() => navigateTo('#community')}>
                  {index === 0 ? 'Apply for Track A' : 'Learn More'} <FaArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="labs" className="home-section labs-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Software Labs</h2>
            <p className="section-subtitle">Interactive tools built by our team to make hard ideas visible.</p>
          </motion.div>

          <div className="labs-grid">
            {labCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  className="lab-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="lab-icon">
                    <Icon />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                  <button className="lab-link" onClick={() => navigateTo('#home')}>
                    Try the Visualizer <FaArrowRight />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-section cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Choose depth. Join the incubation hub.</h2>
          <p className="cta-subtitle">Move from passive learning to a structured, selective path forward.</p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(212, 175, 55, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo('#tracks')}
          >
            Apply for Track A <FaArrowRight />
          </motion.button>
          <div className="cta-decoration">
            <FaRocket className="rocket-icon" />
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
