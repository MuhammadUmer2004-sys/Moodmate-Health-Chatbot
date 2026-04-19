import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { UserPlus } from 'lucide-react';

const Register = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', { username, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error("API Error details:", err);
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Create Account</h2>
        {error && <p style={{ color: 'var(--error)', textAlign: 'center' }}>{error}</p>}
        <div>
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--glass-border)', color: 'white' }}
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--glass-border)', color: 'white' }}
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--glass-border)', color: 'white' }}
          />
        </div>
        <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <UserPlus size={20} /> Register
        </button>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
