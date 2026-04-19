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
import { Smile, Frown, Meh, AlertCircle, Send, Trash2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

const Dashboard = () => {
  const [moods, setMoods] = useState([]);
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState('happy');

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
    try {
      await api.post('/moods', { moodType: selectedMood, note });
      setNote('');
      fetchMoods();
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = {
    labels: moods.slice(0, 7).reverse().map(m => new Date(m.timestamp).toLocaleDateString()),
    datasets: [{
      label: 'Mood Sentiment Score',
      data: moods.slice(0, 7).reverse().map(m => m.sentimentScore || 0),
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      tension: 0.4,
      fill: true,
    }]
  };

  return (
    <div className="dashboard-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        
        {/* Mood Form */}
        <div className="glass-card" style={{ padding: '30px', alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '25px' }}>How are you feeling?</h3>
          <form onSubmit={handleAddMood} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <MoodIcon type="happy" active={selectedMood === 'happy'} onClick={() => setSelectedMood('happy')} />
              <MoodIcon type="neutral" active={selectedMood === 'neutral'} onClick={() => setSelectedMood('neutral')} />
              <MoodIcon type="sad" active={selectedMood === 'sad'} onClick={() => setSelectedMood('sad')} />
              <MoodIcon type="anxious" active={selectedMood === 'anxious'} onClick={() => setSelectedMood('anxious')} />
            </div>
            <textarea 
              placeholder="What's causing this mood?" 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ padding: '15px', borderRadius: '12px', background: 'var(--surface)', border: '1px solid var(--glass-border)', color: 'white', minHeight: '100px' }}
            />
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Send size={18} /> Log Mood
            </button>
          </form>
        </div>

        {/* Analytics */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '25px' }}>Mood Analytics (Last 7 Days)</h3>
          <div style={{ height: '300px' }}>
            <Line data={chartData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: false, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }} />
          </div>
        </div>

      </div>

      {/* History */}
      <div className="glass-card" style={{ marginTop: '30px', padding: '30px' }}>
        <h3 style={{ marginBottom: '20px' }}>Recent Logs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {moods.map(mood => (
            <div key={mood._id} style={{ display: 'flex', alignItems: 'start', gap: '15px', padding: '15px', background: 'var(--surface)', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
              <MoodBadge type={mood.moodType} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong>{mood.moodType.toUpperCase()}</strong>
                  <small style={{ color: 'var(--text-muted)' }}>{new Date(mood.timestamp).toLocaleDateString()}</small>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{mood.note}</p>
                {mood.isUrgent && (
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--error)', fontSize: '0.8rem', fontWeight: 600 }}>
                    <AlertCircle size={14} /> Urgent: Support recommended
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MoodIcon = ({ type, active, onClick }) => {
  const icons = {
    happy: <Smile size={24} />,
    neutral: <Meh size={24} />,
    sad: <Frown size={24} />,
    anxious: <AlertCircle size={24} />,
  };
  return (
    <div 
      onClick={onClick}
      style={{ 
        cursor: 'pointer', 
        padding: '12px', 
        borderRadius: '12px', 
        background: active ? 'var(--primary)' : 'var(--surface)', 
        color: active ? 'white' : 'var(--text-muted)',
        transition: 'all 0.2s'
      }}
    >
      {icons[type]}
    </div>
  );
};

const MoodBadge = ({ type }) => {
  const colors = { happy: '#22c55e', neutral: '#94a3b8', sad: '#f59e0b', anxious: '#ef4444' };
  return <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors[type] || 'var(--primary)', marginTop: '5px' }} />;
}

export default Dashboard;
