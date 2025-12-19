import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = ({ activeTab, setActiveTab }) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // The AuthContext will handle the redirect automatically
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div>
      <div className="header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>School Management System</h1>
            <p>Manage students, teachers, and courses efficiently</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
              Welcome, {currentUser?.email}
            </p>
            <button 
              className="btn btn-secondary" 
              onClick={handleLogout}
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button
          className={`nav-tab ${activeTab === 'teachers' ? 'active' : ''}`}
          onClick={() => setActiveTab('teachers')}
        >
          Teachers
        </button>
        <button
          className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
        <button
          className={`nav-tab ${activeTab === 'database' ? 'active' : ''}`}
          onClick={() => setActiveTab('database')}
        >
          Database Viewer
        </button>
      </div>
    </div>
  );
};

export default Navigation;
