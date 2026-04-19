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
  Legend,
  Filler
} from 'chart.js';
import { Send, Sparkles, History, AlertCircle, SmilePlus, Frown, Zap, Angry, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend, Filler);

// ── Emotion Config (your 5 signals + neutral + urgent) ──────────────────────
const EMOTIONS = {
  happy:     { label: 'Happy',      icon: '😊', color: '#22c55e',  bg: 'rgba(34,197,94,0.12)'  },
  sad:       { label: 'Sad',        icon: '😢', color: '#60a5fa',  bg: 'rgba(96,165,250,0.12)' },
  excitement:{ label: 'Excited',    icon: '🤩', color: '#f59e0b',  bg: 'rgba(245,158,11,0.12)' },
  anger:     { label: 'Angry',      icon: '😠', color: '#ef4444',  bg: 'rgba(239,68,68,0.12)'  },
  anxiety:   { label: 'Anxious',    icon: '😰', color: '#a855f7',  bg: 'rgba(168,85,247,0.12)' },
  neutral:   { label: 'Neutral',    icon: '😐', color: '#94a3b8',  bg: 'rgba(148,163,184,0.12)'},
  urgent:    { label: 'Urgent',     icon: '🚨', color: '#dc2626',  bg: 'rgba(220,38,38,0.12)'  },
};

const EmotionSignal = ({ category }) => {
  const em = EMOTIONS[category?.toLowerCase()] || EMOTIONS.neutral;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '5px 14px', borderRadius: '100px',
      background: em.bg, border: `1px solid ${em.color}40`,
      color: em.color, fontSize: '0.8rem', fontWeight: 700,
    }}>
      <span>{em.icon}</span> {em.label}
    </div>
  );
};

const Dashboard = () => {
  const [moods, setMoods]         = useState([]);
  const [note, setNote]           = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [error, setError]         = useState('');

  const fetchMoods = async () => {
    try {
      const { data } = await api.get('/moods');
      setMoods(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchMoods(); }, []);

  const handleAddMood = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    setAnalyzing(true);
    setError('');
    setLastResult(null);
    try {
      const { data } = await api.post('/moods', { note });
      setLastResult(data); // Show what the AI detected
      setNote('');
      fetchMoods();
    } catch (err) {
      setError('Failed to analyze your entry. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Mood signal counts for the summary row
  const moodCounts = moods.slice(0, 20).reduce((acc, m) => {
    const cat = m.moodType?.toLowerCase() || 'neutral';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: moods.slice(0, 10).reverse().map(m => new Date(m.timestamp).toLocaleDateString()),
    datasets: [{
      label: 'AI Sentiment Flow',
      data: moods.slice(0, 10).reverse().map(m => m.sentimentScore || 0),
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      tension: 0.4, fill: true,
      pointBackgroundColor: moods.slice(0, 10).reverse().map(m => {
        const em = EMOTIONS[m.moodType?.toLowerCase()] || EMOTIONS.neutral;
        return em.color;
      }),
      pointRadius: 6,
    }],
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>

      {/* Emotion Signal Summary Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ padding: '20px 30px', marginBottom: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}
      >
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginRight: '10px' }}>DETECTED SIGNALS</span>
        {Object.entries(EMOTIONS).filter(([key]) => key !== 'urgent').map(([key, em]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <span style={{ fontSize: '1.2rem' }}>{em.icon}</span>
            <span style={{ color: em.color, fontWeight: 700 }}>{moodCounts[key] || 0}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{em.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(300px,1fr) minmax(300px,1.5fr)', 
        gap: '30px', 
        marginBottom: '30px' 
      }}>

        {/* AI Reflection Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '35px', alignSelf: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ padding: '10px', background: 'var(--primary)', borderRadius: '12px' }}>
              <Sparkles size={22} color="white" />
            </div>
            <h3 style={{ margin: 0 }}>Daily Reflection</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Write how you feel. Our AI will instantly signal your emotion — no manual selection needed.
          </p>

          <form onSubmit={handleAddMood} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <textarea
              placeholder='e.g. "I feel excited about my presentation tomorrow, though a bit nervous..."'
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={5}
              style={{
                padding: '18px', borderRadius: '15px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                color: 'white', fontSize: '1rem', outline: 'none', resize: 'vertical',
                transition: 'border 0.3s'
              }}
              onFocus={e => e.target.style.border = '1px solid var(--primary)'}
              onBlur={e => e.target.style.border = '1px solid var(--glass-border)'}
            />

            {error && <p style={{ color: '#f87171', fontSize: '0.85rem', margin: 0 }}>{error}</p>}

            {/* AI Result Flash */}
            <AnimatePresence>
              {lastResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    padding: '16px 20px', borderRadius: '15px',
                    background: (EMOTIONS[lastResult.moodType] || EMOTIONS.neutral).bg,
                    border: `1px solid ${(EMOTIONS[lastResult.moodType] || EMOTIONS.neutral).color}40`,
                    display: 'flex', alignItems: 'center', gap: '12px'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{(EMOTIONS[lastResult.moodType] || EMOTIONS.neutral).icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>AI Detected</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: (EMOTIONS[lastResult.moodType] || EMOTIONS.neutral).color }}>
                      {(EMOTIONS[lastResult.moodType] || EMOTIONS.neutral).label}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Score: {lastResult.sentimentScore?.toFixed(2)} 
                      {lastResult.isUrgent && ' · 🚨 Urgent'}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={analyzing || !note.trim()}
              className="btn-primary"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '16px', opacity: (analyzing || !note.trim()) ? 0.6 : 1, cursor: (analyzing || !note.trim()) ? 'not-allowed' : 'pointer'
              }}
            >
              {analyzing ? '🧠 Analyzing Vibe...' : <><Send size={18} /> Analyze & Log</>}
            </button>
          </form>

          {/* Emotion Legend */}
          <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Object.entries(EMOTIONS).filter(([k]) => k !== 'urgent').map(([key, em]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>{em.icon}</span> {em.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Analytics Chart */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '35px' }}>
          <h3 style={{ marginBottom: '25px' }}>📈 Mood Trends (Last 10)</h3>
          <div style={{ height: '350px' }}>
            <Line
              data={chartData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.4)' } },
                  x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.4)' } }
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Emotional History Timeline */}
      <div className="glass-card" style={{ padding: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
          <History size={22} color="var(--text-muted)" />
          <h3 style={{ margin: 0 }}>Emotional History</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <AnimatePresence>
            {moods.map((mood, i) => (
              <motion.div
                key={mood._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '18px',
                  padding: '20px 25px', borderRadius: '20px',
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${(EMOTIONS[mood.moodType?.toLowerCase()] || EMOTIONS.neutral).color}30`,
                }}
              >
                {/* Big emoji */}
                <span style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>
                  {(EMOTIONS[mood.moodType?.toLowerCase()] || EMOTIONS.neutral).icon}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <EmotionSignal category={mood.moodType} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(mood.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                    "{mood.note}"
                  </p>
                  {mood.isUrgent && (
                    <div style={{
                      marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px',
                      color: '#fca5a5', fontSize: '0.8rem', fontWeight: 600,
                      padding: '8px 14px', background: 'rgba(220,38,38,0.1)', borderRadius: '10px'
                    }}>
                      <AlertCircle size={14} /> 🚨 Urgent flag — please consider reaching out for support.
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {moods.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '60px' }}>
              <Brain size={48} style={{ opacity: 0.3, marginBottom: '15px' }} />
              <p>No entries yet. Write your first reflection above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
