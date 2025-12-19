import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      window.location.href = '/';
    } catch (error) {
      setError('Failed to log in: ' + error.message);
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <div className="header">
        <h1>School Management System</h1>
        <p>Please log in to access the system</p>
      </div>

      <div className="content" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2>Login</h2>
        {error && (
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p>Don't have an account? <button type="button" onClick={onSwitchToSignup} style={{ background: 'none', border: 'none', color: '#667eea', textDecoration: 'underline', cursor: 'pointer' }}>Sign up</button></p>
        </div>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: '#e7f3ff', 
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          <h4>Demo Credentials:</h4>
          <p><strong>Email:</strong> admin@school.com</p>
          <p><strong>Password:</strong> admin123</p>
          <p style={{ color: '#666', fontSize: '0.8rem' }}>
            Note: You need to create these users in Firebase Authentication first
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
