import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Signup = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      window.location.href = '/';
    } catch (error) {
      setError('Failed to create account: ' + error.message);
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <div className="header">
        <h1>School Management System</h1>
        <p>Create a new account</p>
      </div>

      <div className="content" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2>Sign Up</h2>
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
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p>Already have an account? <button type="button" onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', color: '#667eea', textDecoration: 'underline', cursor: 'pointer' }}>Log in</button></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
