import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your MoodMate assistant. How are you feeling today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/chat', { text: input });
      setMessages(prev => [...prev, { text: data.response, isBot: true }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "I'm having trouble connecting right now. Please try again later.", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn-primary"
        style={{ position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 0 }}
      >
        <MessageCircle size={30} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="glass-card"
            style={{ position: 'fixed', bottom: '100px', right: '30px', width: '350px', height: '500px', display: 'flex', flexDirection: 'column', zIndex: 1001, overflow: 'hidden' }}
          >
            {/* Header */}
            <div style={{ padding: '15px 20px', background: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={20} />
                <span style={{ fontWeight: 600 }}>MoodMate AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', color: 'white' }}><X size={20}/></button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ 
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: msg.isBot ? '15px 15px 15px 0' : '15px 15px 0 15px',
                  background: msg.isBot ? 'var(--surface)' : 'var(--primary)',
                  color: 'white',
                  fontSize: '0.9rem',
                  display: 'flex',
                  gap: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  {msg.isBot ? <Bot size={14} style={{ marginTop: '2px' }} /> : <User size={14} style={{ marginTop: '2px' }} />}
                  <span>{msg.text}</span>
                </div>
              ))}
              {loading && <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.8rem' }}>AI is typing...</div>}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} style={{ padding: '15px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'var(--surface)', border: 'none', color: 'white' }}
              />
              <button type="submit" disabled={loading} style={{ background: 'var(--primary)', color: 'white', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
