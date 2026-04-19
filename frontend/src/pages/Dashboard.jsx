import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title as ChartTitle, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Smile, Frown, Meh, AlertCircle, Send, Sparkles, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

const Dashboard = () => {
  const [moods, setMoods] = useState([]);
  const [note, setNote] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const fetchMoods = async () => {
    try {
      const { data } = await api.get('/moods');
      setMoods(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMoods(); }, []);

  const handleAddMood = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    
    setAnalyzing(true);
    setError('');
    
    try {
      await api.post('/moods', { note });
      setNote('');
      fetchMoods();
    } catch (err) {
      setError('Failed to analyze mood. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const chartData = {
    labels: moods.slice(0, 10).reverse().map(m => new Date(m.timestamp).toLocaleDateString()),
    datasets: [{
      label: 'AI Sentiment Flow',
      data: moods.slice(0, 10).reverse().map(m => m.sentimentScore || 0),
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#a78bfa'
    }]
  };

  return (
    <div className="dashboard-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', marginBottom: '40px' }} className="responsive-grid">
        
        {/* AI Analysis Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card" 
          style={{ padding: '35px', alignSelf: 'start' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <div style={{ padding: '10px', background: 'var(--primary)', borderRadius: '12px' }}>
               <Sparkles size={24} color="white" />
            </div>
            <h3 style={{ margin: 0 }}>Daily Reflection</h3>
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Tell CareFlow AI how you're feeling. Our AI will automatically detect your mood and provide insights.
          </p>

          <form onSubmit={handleAddMood} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <textarea 
              placeholder="Ex: I feel a bit overwhelmed today, but the morning walk helped..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ 
                padding: '20px', 
                borderRadius: '15px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--glass-border)', 
                color: 'white', 
                minHeight: '150px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.border = '1px solid var(--primary)'}
              onBlur={(e) => e.target.style.border = '1px solid var(--glass-border)'}
            />
            {error && <div style={{ color: 'var(--error)', fontSize: '0.85rem' }}>{error}</div>}
            
            <button 
              type="submit" 
              disabled={analyzing || !note.trim()}
              className="btn-primary" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px',
                padding: '16px',
                opacity: (analyzing || !note.trim()) ? 0.7 : 1
              }}
            >
              {analyzing ? 'Analyzing Vibe...' : <><Send size={18} /> Analyze & Log</>}
            </button>
          </form>
        </motion.div>

        {/* Analytics Visualization */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card" 
          style={{ padding: '35px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <div style={{ padding: '10px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '12px' }}>
               <Smile size={24} color="#a78bfa" />
            </div>
            <h3 style={{ margin: 0 }}>Mood Trends</h3>
          </div>
          <div style={{ height: '350px' }}>
            <Line 
              data={chartData} 
              options={{ 
                maintainAspectRatio: false, 
                plugins: { legend: { display: false } },
                scales: { 
                  y: { 
                    beginAtZero: false, 
                    grid: { color: 'rgba(255,255,255,0.05)' } 
                  }, 
                  x: { grid: { display: false } } 
                } 
              }} 
            />
          </div>
        </motion.div>

      </div>

      {/* History Timeline */}
      <div className="glass-card" style={{ padding: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
           <History size={24} color="var(--text-muted)" />
           <h3 style={{ margin: 0 }}>Emotional History</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          <AnimatePresence>
            {moods.map((mood, index) => (
              <motion.div 
                key={mood._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px', 
                  padding: '25px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '20px', 
                  border: '1px solid var(--glass-border)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <MoodBadge type={mood.moodType} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(mood.timestamp).toLocaleDateString()}
                  </span>
                </div>
                
                <p style={{ fontSize: '0.95rem', color: 'white', lineHeight: 1.5, margin: 0 }}>
                  "{mood.note}"
                </p>

                {mood.isUrgent && (
                  <div style={{ 
                    marginTop: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    color: '#f87171', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    padding: '8px 12px',
                    background: 'rgba(248, 113, 113, 0.1)',
                    borderRadius: '10px'
                  }}>
                    <AlertCircle size={14} /> Urgent Flag: Please check in with yourself.
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const MoodBadge = ({ type }) => {
  const configs = {
    happy: { color: '#22c55e', text: 'Joyful' },
    neutral: { color: '#94a3b8', text: 'Neutral' },
    sad: { color: '#3b82f6', text: 'Low' },
    anxious: { color: '#f59e0b', text: 'Anxious' },
    urgent: { color: '#ef4444', text: 'Critical' }
  };
  const config = configs[type.toLowerCase()] || configs.neutral;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      padding: '5px 12px', 
      borderRadius: '100px', 
      background: `${config.color}20`,
      border: `1px solid ${config.color}40`,
      color: config.color,
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase'
    }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.color }} />
      {config.text}
    </div>
  );
}

export default Dashboard;
