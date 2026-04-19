import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Activity, Brain, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 40%)'
    }}>
      
      {/* Background Glows (Simulating the image) */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        zIndex: -1,
        background: 'url("https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop") center/cover no-repeat',
        filter: 'brightness(0.3) blur(20px)',
        opacity: 0.6
      }} />

      {/* Main Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card" 
        style={{ 
          maxWidth: '900px', 
          width: '100%',
          padding: '80px 40px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '40px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(30px) saturate(180%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Brain Wave Icon */}
        <motion.div
           animate={{ scale: [1, 1.1, 1] }}
           transition={{ repeat: Infinity, duration: 4 }}
           style={{ margin: '0 auto 40px', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ 
            padding: '25px', 
            borderRadius: '50%', 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            boxShadow: '0 0 50px rgba(139, 92, 246, 0.4)'
          }}>
            <Brain size={80} color="#a78bfa" />
          </div>
        </motion.div>

        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          marginBottom: '20px', 
          lineHeight: 1.1,
          letterSpacing: '-1px'
        }} className="gradient-text">
          Meet CareFlow AI: Your Empathetic Partner in Personal Wellness
        </h1>

        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-muted)', 
          maxWidth: '600px', 
          margin: '0 auto 40px',
          lineHeight: 1.6
        }}>
          Advanced health insights, anytime you need them. <br />
          Connect and thrive with personalized AI care.
        </p>

        <button 
          onClick={() => navigate('/register')}
          className="btn-primary" 
          style={{ 
            fontSize: '1.1rem', 
            padding: '16px 40px', 
            borderRadius: '100px',
            boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)'
          }}
        >
          Start Your Journey <ArrowRight style={{ marginLeft: '10px' }} />
        </button>

        {/* Small floating info card */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 25px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: 'max-content'
        }}>
           <Activity color="#ec4899" size={20} />
           <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Mind & Heart: We understand.</span>
        </div>
      </motion.div>

      {/* Decorative floating elements */}
      <div style={{ display: 'flex', gap: '30px', marginTop: '40px' }}>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Heart color="#ef4444" size={24} />
          <span style={{ fontSize: '0.9rem' }}>Real-time Support</span>
        </div>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Activity color="#22c55e" size={24} />
          <span style={{ fontSize: '0.9rem' }}>Deep Insights</span>
        </div>
      </div>

    </div>
  );
};

export default Home;
