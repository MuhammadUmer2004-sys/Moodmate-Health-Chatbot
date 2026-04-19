import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.png';
import { ArrowRight, Bot, Shield, Zap } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ 
      minHeight: '100vh', 
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: '#0a0a1a',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Immersive Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1,
        opacity: 0.6
      }} />

      {/* Hero Content Section (Shifted to Side) */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '100%', 
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 5%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start' // Align to left
      }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card"
          style={{
            padding: '60px 50px',
            borderRadius: '40px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%',
            maxWidth: '600px', // Smaller width to stay on the side
            textAlign: 'left',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
             <div style={{ padding: '12px', background: 'var(--primary)', borderRadius: '15px' }}>
                <Bot size={28} color="white" />
             </div>
             <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '2px' }}>CAREFLOW AI</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', 
            fontWeight: 800, 
            lineHeight: 1,
            marginBottom: '25px'
          }} className="gradient-text">
            Meet CareFlow AI: Your Empathetic Partner
          </h1>

          <p style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '40px'
          }}>
            Advanced health insights, anytime you need them. Connect and thrive with personalized AI care focused on your mind & heart.
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/register')}
              className="btn-primary"
              style={{ padding: '18px 45px', borderRadius: '100px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              Start Your Journey <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="btn-secondary"
              style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '18px 45px', borderRadius: '100px', color: 'white' }}
            >
              Sign In
            </button>
          </div>

          <div style={{ marginTop: '50px', display: 'flex', gap: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <Shield size={18} color="#22c55e" /> Secure Encrypted
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <Zap size={18} color="#eab308" /> Real-time Analysis
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
