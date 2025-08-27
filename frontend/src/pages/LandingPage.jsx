import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

// Premium Illustrations as Components
const TaskPlanningIllustration = () => ( <div className="feature-illustration">📋</div> );
const AnalyticsIllustration = () => ( <div className="feature-illustration analytics-illustration">📊</div> );
const StudyGroupsIllustration = () => ( <div className="feature-illustration groups-illustration">👥</div> );
const AIAssistantIllustration = () => ( <div className="feature-illustration ai-illustration">🤖</div> );
const HeroIllustration = () => ( <div className="hero-illustration"><div className="main-dashboard-card"><div className="card-header-bar"></div><div className="progress-bars"><div className="progress-bar"><div className="progress-fill p-1"></div></div><div className="progress-bar"><div className="progress-fill p-2"></div></div></div><div className="mini-chart">{[20, 35, 15, 30, 25, 40, 18].map((h, i) => ( <div key={i} className="chart-bar" style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }} ></div> ))}</div></div><div className="floating-card c-1"></div><div className="floating-card c-2"></div></div> );

// --- FULLY FUNCTIONAL Contact Form Component ---
const ContactForm = () => {
  // State updated to match backend (username, context)
  const [formData, setFormData] = useState({ username: '', email: '', context: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Send data to your backend endpoint
      await axios.post('http://localhost:5001/api/contact', formData);
      setStatus('success');
      setFormData({ username: '', email: '', context: '' }); // Clear form
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username" // Updated name
          value={formData.username}
          onChange={handleChange}
          required
          className="form-input"
          disabled={status === 'sending'}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
          disabled={status === 'sending'}
        />
      </div>
      <div className="form-group">
        <label>Context / Message</label> {/* Updated label */}
        <textarea
          name="context" // Updated name
          value={formData.context}
          onChange={handleChange}
          rows="5"
          required
          className="form-input form-textarea"
          disabled={status === 'sending'}
        />
      </div>
      <button type="submit" className="contact-submit-btn" disabled={status === 'sending'}>
        {status === 'sending' && 'Sending...'}
        {status === 'idle' && 'Send Message'}
        {status === 'success' && 'Message Sent! ✔'}
        {status === 'error' && 'Try Again'}
      </button>
      {status === 'error' && <p className="form-status-error">Something went wrong. Please try again later.</p>}
    </form>
  );
};


const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState('home');

  return (
    <div className="new-landing-page">
      <header className="landing-header">
        <nav className="landing-nav">
          <div className="nav-logo">&lt;ProdigyHub/&gt;</div>
          <div className="nav-links">
            <button onClick={() => setCurrentSection('home')} className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}>Features</button>
            <button onClick={() => setCurrentSection('about')} className={`nav-link ${currentSection === 'about' ? 'active' : ''}`}>About</button>
            <button onClick={() => setCurrentSection('contact')} className={`nav-link ${currentSection === 'contact' ? 'active' : ''}`}>Contact</button>
          </div>
          <Link to="/signup" className="nav-get-started-btn">Get Started</Link>
        </nav>
      </header>

      <main>
        {currentSection === 'home' && ( <> <section className="hero-section"><div className="hero-content"><h1 className="hero-headline">Master Your Studies.<br /><span className="gradient-text">Unlock Your Potential.</span></h1><p className="hero-subtext">The all-in-one platform to organize tasks, track progress, and collaborate with peers. Powered by AI for the modern learner.</p><Link to="/signup" className="hero-cta-button">🚀 Launch Your Dashboard</Link><HeroIllustration /></div></section><section className="features-section"><div className="features-container"><h2 className="features-title">Everything You Need to Succeed</h2><div className="features-grid"><div className="feature-card"><TaskPlanningIllustration /><h3 className="feature-card-title">Smart Task Planning</h3><p className="feature-card-text">Organize your daily tasks and long-term goals with intelligent scheduling and priority management.</p></div><div className="feature-card"><AnalyticsIllustration /><h3 className="feature-card-title">Progress Analytics</h3><p className="feature-card-text">Visualize your study progress with beautiful animated charts and detailed performance insights.</p></div><div className="feature-card"><StudyGroupsIllustration /><h3 className="feature-card-title">Study Groups</h3><p className="feature-card-text">Collaborate with peers in dedicated study groups with real-time chat and resource sharing.</p></div><div className="feature-card"><AIAssistantIllustration /><h3 className="feature-card-title">AI Assistant</h3><p className="feature-card-text">Get instant help and personalized guidance from our advanced AI-powered study assistant.</p></div></div></div></section></> )}
        {currentSection === 'about' && ( <section className="content-section"><h2 className="section-title">About ProdigyHub</h2><p className="section-subtitle">Our mission is to empower learners through intelligent, accessible, and collaborative technology.</p><div className="about-grid"><div className="about-card">🎯 <h4>Focus-Driven</h4><p>Built with a distraction-free user experience at its core.</p></div><div className="about-card">🚀 <h4>Performance-First</h4><p>A lightning-fast and responsive design for seamless learning.</p></div><div className="about-card">🔒 <h4>Secure & Private</h4><p>Your data is protected with enterprise-grade security.</p></div></div></section> )}
        {currentSection === 'contact' && ( <section className="content-section"><h2 className="section-title">Get in Touch</h2><p className="section-subtitle">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p><ContactForm /></section> )}
      </main>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} ProdigyHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;