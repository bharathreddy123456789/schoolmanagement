import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import StudentManagement from './components/StudentManagement';
import TeacherManagement from './components/TeacherManagement';
import CourseManagement from './components/CourseManagement';
import Dashboard from './components/Dashboard';
import DatabaseViewer from './components/SimpleDatabaseViewer';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [studentsRes, teachersRes, coursesRes] = await Promise.all([
        axios.get('/api/students'),
        axios.get('/api/teachers'),
        axios.get('/api/courses')
      ]);
      
      setStats({
        students: studentsRes.data.length,
        teachers: teachersRes.data.length,
        courses: coursesRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'students':
        return <StudentManagement onDataChange={fetchStats} />;
      case 'teachers':
        return <TeacherManagement onDataChange={fetchStats} />;
      case 'courses':
        return <CourseManagement onDataChange={fetchStats} />;
      case 'database':
        return <DatabaseViewer />;
      default:
        return <Dashboard stats={stats} />;
    }
  };

  return (
    <div className="container">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

function AppContent() {
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');

  // If user is logged in, show main app
  if (currentUser) {
    return <MainApp />;
  }

  // Show login or signup page
  if (currentPage === 'signup') {
    return <Signup onSwitchToLogin={() => setCurrentPage('login')} />;
  }

  return <Login onSwitchToSignup={() => setCurrentPage('signup')} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
