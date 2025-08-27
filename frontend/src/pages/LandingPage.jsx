import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- A more detailed, multi-layered SVG Illustration ---
const HeroIllustration = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (i) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.2 + 0.5, duration: 0.6, ease: "easeOut" }
    }),
  };

  return (
    <motion.div
      className="illustration-container"
      whileHover={{ scale: 1.05, rotate: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div custom={1} variants={cardVariants} className="illustration-card-bg"></motion.div>
      <motion.div custom={2} variants={cardVariants} className="illustration-card-1">
        <div className="card-header">Weekly Goals</div>
        <div className="card-progress-bar"></div>
      </motion.div>
      <motion.div custom={3} variants={cardVariants} className="illustration-card-2">
        <div className="card-header">Tasks</div>
        <div className="card-task"></div>
        <div className="card-task"></div>
      </motion.div>
      <motion.div custom={4} variants={cardVariants} className="illustration-card-3">
        <div className="card-chart-bar c1"></div>
        <div className="card-chart-bar c2"></div>
        <div className="card-chart-bar c3"></div>
      </motion.div>
    </motion.div>
  );
};

// --- Reusable Feature Card ---
const FeatureCard = ({ icon, title, children }) => (
    <div className="feature-card">
        <div className="feature-illustration">{icon}</div>
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-text">{children}</p>
    </div>
);

// --- SVG Icons for Features ---
const TaskPlanningIcon = () => ( <svg className="feature-illustration" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 14H50" stroke="url(#paint0_linear_101_2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M28 26H50" stroke="url(#paint1_linear_101_2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M28 38H50" stroke="url(#paint2_linear_101_2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 14H16" stroke="url(#paint3_linear_101_2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 26H16" stroke="url(#paint4_linear_101_2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 38H16" stroke="url(#paint5_linear_101_2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="56" height="56" rx="8" stroke="url(#paint6_linear_101_2)" strokeWidth="4"/><defs><linearGradient id="paint0_linear_101_2" x1="28" y1="14" x2="50" y2="14" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint1_linear_101_2" x1="28" y1="26" x2="50" y2="26" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint2_linear_101_2" x1="28" y1="38" x2="50" y2="38" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint3_linear_101_2" x1="14" y1="14" x2="16" y2="14" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint4_linear_101_2" x1="14" y1="26" x2="16" y2="26" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint5_linear_101_2" x1="14" y1="38" x2="16" y2="38" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint6_linear_101_2" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2" stopOpacity="0.5"/><stop offset="1" stopColor="#00BFFF" stopOpacity="0.5"/></linearGradient></defs></svg> );
const AnalyticsIcon = () => ( <svg className="feature-illustration" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 52V32" stroke="url(#paint0_linear_analytics)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M32 52V12" stroke="url(#paint1_linear_analytics)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M50 52V22" stroke="url(#paint2_linear_analytics)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="56" height="56" rx="8" stroke="url(#paint3_linear_analytics)" strokeWidth="4"/><defs><linearGradient id="paint0_linear_analytics" x1="14" y1="32" x2="14" y2="52" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint1_linear_analytics" x1="32" y1="12" x2="32" y2="52" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint2_linear_analytics" x1="50" y1="22" x2="50" y2="52" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint3_linear_analytics" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2" stopOpacity="0.5"/><stop offset="1" stopColor="#00BFFF" stopOpacity="0.5"/></linearGradient></defs></svg> );
const StudyGroupsIcon = () => ( <svg className="feature-illustration" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 48V46C44 40.4772 39.5228 36 34 36H22C16.4772 36 12 40.4772 12 46V48" stroke="url(#paint0_linear_groups)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M28 28C31.3137 28 34 25.3137 34 22C34 18.6863 31.3137 16 28 16C24.6863 16 22 18.6863 22 22C22 25.3137 24.6863 28 28 28Z" stroke="url(#paint1_linear_groups)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M52 48V46C52 41.0294 47.9706 37 43 37" stroke="url(#paint2_linear_groups)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M40 28C42.2091 28 44 26.2091 44 24C44 21.7909 42.2091 20 40 20" stroke="url(#paint3_linear_groups)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="paint0_linear_groups" x1="12" y1="36" x2="44" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint1_linear_groups" x1="22" y1="16" x2="34" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint2_linear_groups" x1="43" y1="37" x2="52" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2" stopOpacity="0.7"/><stop offset="1" stopColor="#00BFFF" stopOpacity="0.7"/></linearGradient><linearGradient id="paint3_linear_groups" x1="40" y1="20" x2="44" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2" stopOpacity="0.7"/><stop offset="1" stopColor="#00BFFF" stopOpacity="0.7"/></linearGradient></defs></svg> );
const AIBotIcon = () => ( <svg className="feature-illustration" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48 36V28C48 16.9543 39.0457 8 28 8H20C8.9543 8 0 16.9543 0 28V36" stroke="url(#paint0_linear_bot)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" transform="translate(8 8)"/><path d="M24 24H24.02" stroke="url(#paint1_linear_bot)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" transform="translate(8 8)"/><path d="M32 24H32.02" stroke="url(#paint2_linear_bot)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" transform="translate(8 8)"/><path d="M28 44C37.9411 44 46 35.9411 46 26H10C10 35.9411 18.0589 44 28 44Z" fill="url(#paint3_linear_bot)" transform="translate(8 8)"/><defs><linearGradient id="paint0_linear_bot" x1="0" y1="8" x2="48" y2="36" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2" stopOpacity="0.5"/><stop offset="1" stopColor="#00BFFF" stopOpacity="0.5"/></linearGradient><linearGradient id="paint1_linear_bot" x1="24" y1="24" x2="24.02" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint2_linear_bot" x1="32" y1="24" x2="32.02" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient><linearGradient id="paint3_linear_bot" x1="10" y1="26" x2="46" y2="44" gradientUnits="userSpaceOnUse"><stop stopColor="#8A2BE2"/><stop offset="1" stopColor="#00BFFF"/></linearGradient></defs></svg> );


const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="landing-page-container">
      <header className="header">
        <nav className="header-nav">
          <div className="nav-logo">ProdigyHub</div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#solutions">Solutions</a>
            <a href="#pricing">Pricing</a>
          </div>
          <Link to="/signup" className="nav-get-started-btn">
            Get Started
          </Link>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 className="hero-headline" variants={itemVariants}>
              Master Your Studies. <br />
              <span className="gradient-text">Unlock Your Potential.</span>
            </motion.h1>
            <motion.p className="hero-subtext" variants={itemVariants}>
              The all-in-one platform to organize tasks, track progress, and collaborate with peers. Powered by AI.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link to="/signup" className="hero-cta-button">
                🚀 Launch Your Dashboard
              </Link>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
               <HeroIllustration />
            </motion.div>
          </motion.div>
        </section>

        <section id="features" className="features-section">
          <h2 className="features-title">Everything You Need to Succeed</h2>
          <div className="features-grid">
            <FeatureCard icon={<TaskPlanningIcon />} title="Task Planning">
                Organize your daily tasks and long-term goals in one clean interface.
            </FeatureCard>
            <FeatureCard icon={<AnalyticsIcon />} title="Progress Analytics">
                Visualize your study progress with animated charts and detailed reports.
            </FeatureCard>
            <FeatureCard icon={<StudyGroupsIcon />} title="Study Groups">
                Collaborate with peers in dedicated study groups and discussion channels.
            </FeatureCard>
            <FeatureCard icon={<AIBotIcon />} title="AI Assistant">
                Get instant help and guidance from our AI-powered study assistant.
            </FeatureCard>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;