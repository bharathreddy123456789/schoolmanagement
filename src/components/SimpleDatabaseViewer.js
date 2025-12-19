import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SimpleDatabaseViewer = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching data...');
      
      const [studentsRes, teachersRes, coursesRes] = await Promise.all([
        axios.get('/api/students'),
        axios.get('/api/teachers'),
        axios.get('/api/courses')
      ]);
      
      console.log('API Responses:', {
        students: studentsRes.data,
        teachers: teachersRes.data,
        courses: coursesRes.data
      });
      
      setStudents(studentsRes.data);
      setTeachers(teachersRes.data);
      setCourses(coursesRes.data);
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Loading database data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <h2>Error loading data</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchData}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Database Viewer (Simple Version)</h2>
        <button className="btn btn-primary" onClick={fetchData}>
          Refresh Data
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <p>This is a simplified version to debug the data display issue.</p>
        <p><strong>Data Status:</strong> Students: {students.length}, Teachers: {teachers.length}, Courses: {courses.length}</p>
      </div>

      {/* Students Table */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Students Table ({students.length} records)</h3>
        {students.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Grade</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id || index}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.grade}</td>
                  <td>{student.date_of_birth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students found</p>
        )}
      </div>

      {/* Teachers Table */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Teachers Table ({teachers.length} records)</h3>
        {teachers.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={teacher.id || index}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.experience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No teachers found</p>
        )}
      </div>

      {/* Courses Table */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Courses Table ({courses.length} records)</h3>
        {courses.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Teacher ID</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id || index}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>{course.teacher_id}</td>
                  <td>{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No courses found</p>
        )}
      </div>

      {/* Raw Data Display */}
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Raw Data (for debugging):</h4>
        <details>
          <summary>Students Data</summary>
          <pre>{JSON.stringify(students, null, 2)}</pre>
        </details>
        <details>
          <summary>Teachers Data</summary>
          <pre>{JSON.stringify(teachers, null, 2)}</pre>
        </details>
        <details>
          <summary>Courses Data</summary>
          <pre>{JSON.stringify(courses, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
};

export default SimpleDatabaseViewer;
