import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ 
      minHeight: '100vh', 
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a1a'
    }}>
      {/* Background Image Layer */}
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
        opacity: 0.9
      }} />

      {/* Interactive Overlay Layer */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '100%', 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* We recreate the button and invisible trigger areas over the image's design */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5, duration: 1 }}
           style={{ textAlign: 'center' }}
        >
          {/* Transparent trigger area over the "Start Your Journey" button in the image */}
          <button 
            onClick={() => navigate('/register')}
            style={{
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              marginTop: '130px', // Adjusted to align with the image's button position
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            Start Your Journey
          </button>
        </motion.div>

        {/* Floating bottom login area (approximate position from image) */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          width: '280px',
          height: '150px',
          cursor: 'pointer'
        }} onClick={() => navigate('/login')}>
          {/* This acts as a hit zone for the login box in the image */}
        </div>

      </div>
    </div>
  );
};

export default Home;
