import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.png';
import { ArrowRight, Bot } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ 
      minHeight: '100vh', 
      width: '100%',
      position: 'relative',
      overflowX: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a1a'
    }}>
      {/* Background Image Layer - Covers everything */}
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
        opacity: 0.7
      }} />

      {/* Responsive Content Layer */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '100%', 
        maxWidth: '1200px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center'
      }}>
        
        {/* Responsive Glass Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
          style={{
            padding: 'calc(20px + 4vw)',
            borderRadius: 'clamp(20px, 5vw, 40px)',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%',
            maxWidth: '900px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          {/* Logo/Icon Area */}
          <div style={{
            width: 'clamp(60px, 15vw, 100px)',
            height: 'clamp(60px, 15vw, 100px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px'
          }}>
            <Bot size={40} color="#a78bfa" className="pulse" />
          </div>

          <h1 style={{ 
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1,
            margin: 0
          }} className="gradient-text">
            Meet CareFlow AI: Your Empathetic Partner in Personal Wellness
          </h1>

          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
            color: 'var(--text-muted)',
            maxWidth: '650px',
            lineHeight: 1.5,
            margin: '10px 0'
          }}>
            Advanced health insights, anytime you need them. Connect and thrive with personalized AI care.
          </p>

          <button 
            onClick={() => navigate('/register')}
            className="btn-primary"
            style={{ 
              padding: 'clamp(12px, 3vw, 18px) clamp(30px, 6vw, 50px)',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '10px'
            }}
          >
            Start Your Journey <ArrowRight size={20} />
          </button>

          {/* Floating badge for mobile (stacked) */}
          <div style={{
            marginTop: '20px',
            padding: '10px 20px',
            borderRadius: '100px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.85rem'
          }}>
            Mind & Heart: We understand.
          </div>
        </motion.div>

        {/* Login Hint for mobile */}
        <div 
          onClick={() => navigate('/login')}
          style={{ 
            marginTop: '30px', 
            color: 'var(--text-muted)', 
            cursor: 'pointer',
            fontSize: '0.9rem',
            textDecoration: 'underline'
          }}
        >
          Already have an account? Sign In
        </div>

      </div>

      <style>{`
        .pulse {
          animation: pulse-animation 3s infinite ease-in-out;
        }
        @keyframes pulse-animation {
          0% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.5)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.8)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.5)); }
        }
      `}</style>
    </div>
  );
};

export default Home;
