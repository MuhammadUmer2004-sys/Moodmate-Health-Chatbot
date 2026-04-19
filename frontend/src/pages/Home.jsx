import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero_clean.png';
import { ArrowRight, Bot, Shield, Activity } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ 
      minHeight: '100vh', 
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: '#04040c',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Immersive CLEAN Background (No more overlapping text!) */}
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
        opacity: 0.8
      }} />

      {/* Professional Content Layer */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '100%', 
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 8%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{
            padding: '70px 60px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            width: '100%',
            maxWidth: '650px',
            textAlign: 'left',
            boxShadow: '0 50px 100px rgba(0,0,0,0.6)'
          }}
        >
          {/* Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
             <div style={{ padding: '15px', background: 'var(--primary)', borderRadius: '20px', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}>
                <Bot size={30} color="white" />
             </div>
             <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '4px', color: 'rgba(255,255,255,0.9)' }}>CAREFLOW AI</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', 
            fontWeight: 900, 
            lineHeight: 1,
            marginBottom: '30px',
            letterSpacing: '-2px'
          }} className="gradient-text">
            Meet CareFlow AI:<br />Your Partner
          </h1>

          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '45px',
            maxWidth: '500px'
          }}>
            Experience advanced salud insights and personalized AI support designed to prioritize your emotional and physical wellness.
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/register')}
              className="btn-primary"
              style={{ 
                padding: '20px 50px', 
                borderRadius: '100px', 
                fontSize: '1.15rem', 
                fontWeight: 700,
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px' 
              }}
            >
              Start Journey <ArrowRight size={22} />
            </button>
            <button 
              onClick={() => navigate('/login')}
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                padding: '20px 50px', 
                borderRadius: '100px', 
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          </div>

          {/* Footer stats / trust indicators */}
          <div style={{ 
            marginTop: '60px', 
            display: 'flex', 
            gap: '40px', 
            borderTop: '1px solid rgba(255,255,255,0.05)', 
            paddingTop: '35px' 
          }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                <Shield size={18} color="#22c55e" /> HIPAA Compliant
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                <Activity size={18} color="#ec4899" /> 24/7 AI Support
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
