import React from 'react';

const Dashboard = ({ stats }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the School Management System. Here's an overview of your school data.</p>
      
      <div className="stats">
        <div className="stat-card">
          <h3>{stats.students}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{stats.teachers}</h3>
          <p>Total Teachers</p>
        </div>
        <div className="stat-card">
          <h3>{stats.courses}</h3>
          <p>Total Courses</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Quick Actions</h3>
        <p>Use the navigation tabs above to manage students, teachers, and courses.</p>
        <ul style={{ marginTop: '1rem', paddingLeft: '2rem' }}>
          <li>Add new students and manage their information</li>
          <li>Register teachers and assign subjects</li>
          <li>Create courses and assign teachers</li>
          <li>View and edit all records</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
