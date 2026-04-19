import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Activity, MessageCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container" style={{ padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 100px' }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '4.5rem', marginBottom: '20px', lineHeight: 1.1 }}>
            Your Emotional <span className="gradient-text">Sanctuary</span> Guided by AI
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
            Experience the next generation of mental wellness. Track your moods, gain personalized insights, and chat with an AI that truly understands you.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', textDecoration: 'none' }}>Get Started Free</Link>
            <button className="btn-secondary" style={{ padding: '15px 40px', fontSize: '1.1rem', background: 'var(--glass)', color: 'white', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>View Demo</button>
          </div>
        </motion.div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <FeatureCard 
          icon={<Shield color="#ec4899" />} 
          title="Secure Auth" 
          desc="Your data is encrypted and protected with industry-standard protocols." 
        />
        <FeatureCard 
          icon={<Sparkles color="#8b5cf6" />} 
          title="AI Insights" 
          desc="Personalized mental health tips based on your daily mood logs." 
        />
        <FeatureCard 
          icon={<Activity color="#22c55e" />} 
          title="Mood Analytics" 
          desc="Visualize your emotional trends with interactive dynamic charts." 
        />
        <FeatureCard 
          icon={<MessageCircle color="#6366f1" />} 
          title="Real-time Chat" 
          desc="Cognitive behavioral assistant available 24/7 for support." 
        />
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-card" 
    style={{ padding: '30px', textAlign: 'left' }}
  >
    <div style={{ marginBottom: '20px' }}>{icon}</div>
    <h3 style={{ marginBottom: '10px' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{desc}</p>
  </motion.div>
);

export default Home;
