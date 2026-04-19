import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut, LayoutDashboard, Home as HomeIcon } from 'lucide-react';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar glass-card" style={{ margin: '20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '20px', zIndex: 1000 }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
        <Brain size={32} color="#8b5cf6" />
        <span style={{ fontSize: '1.5rem', fontWeight: 800 }} className="gradient-text">MoodMate</span>
      </Link>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}><HomeIcon size={20}/></Link>
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}><LayoutDashboard size={20}/></Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Hello, {user.username}</span>
              <button onClick={handleLogout} className="btn-secondary" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px 15px', borderRadius: '10px' }}>
                <LogOut size={18}/>
              </button>
            </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
            <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>Join Now</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
