import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseViewer = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeTable, setActiveTable] = useState('students');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [studentsRes, teachersRes, coursesRes] = await Promise.all([
        axios.get('/api/students'),
        axios.get('/api/teachers'),
        axios.get('/api/courses')
      ]);
      setStudents(studentsRes.data);
      setTeachers(teachersRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const renderTable = (data, columns, tableName) => {
    console.log('Rendering table:', { data, columns, tableName, loading });
    
    if (loading) {
      return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
    }

    if (!data || data.length === 0) {
      return <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No data found</div>;
    }

    return (
      <div>
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>
          {tableName} ({data.length} records)
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ minWidth: '600px' }}>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => {
                    let value;
                    switch (column) {
                      case 'ID':
                        value = row.id;
                        break;
                      case 'Name':
                        value = row.name;
                        break;
                      case 'Email':
                        value = row.email;
                        break;
                      case 'Phone':
                        value = row.phone;
                        break;
                      case 'Grade':
                        value = row.grade;
                        break;
                      case 'Subject':
                        value = row.subject;
                        break;
                      case 'Experience':
                        value = row.experience;
                        break;
                      case 'Course Name':
                        value = row.name;
                        break;
                      case 'Description':
                        value = row.description;
                        break;
                      case 'Teacher ID':
                        value = row.teacher_id;
                        break;
                      case 'Teacher Name':
                        value = row.teacher_name;
                        break;
                      case 'Teacher Subject':
                        value = row.teacher_subject;
                        break;
                      case 'Credits':
                        value = row.credits;
                        break;
                      case 'Date of Birth':
                        value = row.date_of_birth ? new Date(row.date_of_birth).toLocaleDateString() : '';
                        break;
                      case 'Created At':
                        value = row.created_at ? new Date(row.created_at).toLocaleString() : '';
                        break;
                      default:
                        value = row[column.toLowerCase().replace(' ', '_')] || '';
                    }
                    return <td key={colIndex}>{value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const getTableData = () => {
    console.log('Current data:', { students, teachers, courses, activeTable });
    
    switch (activeTable) {
      case 'students':
        return {
          data: students,
          columns: ['ID', 'Name', 'Email', 'Phone', 'Grade', 'Date of Birth', 'Created At'],
          tableName: 'Students Table'
        };
      case 'teachers':
        return {
          data: teachers,
          columns: ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Experience', 'Created At'],
          tableName: 'Teachers Table'
        };
      case 'courses':
        return {
          data: courses,
          columns: ['ID', 'Course Name', 'Description', 'Teacher ID', 'Credits', 'Created At'],
          tableName: 'Courses Table'
        };
      case 'courses_with_teachers':
        const coursesWithTeachers = courses.map(course => {
          const teacher = teachers.find(t => t.id === course.teacher_id);
          return {
            ...course,
            teacher_name: teacher ? teacher.name : 'Unknown',
            teacher_subject: teacher ? teacher.subject : 'Unknown'
          };
        });
        return {
          data: coursesWithTeachers,
          columns: ['ID', 'Course Name', 'Description', 'Teacher Name', 'Teacher Subject', 'Credits', 'Created At'],
          tableName: 'Courses with Teachers (JOIN Query)'
        };
      default:
        return { data: [], columns: [], tableName: 'No Table Selected' };
    }
  };

  const { data, columns, tableName } = getTableData();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Database Viewer (SQL Tables)</h2>
        <button className="btn btn-primary" onClick={fetchAllData}>
          Refresh Data
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          View your database tables in SQL format. This shows the actual data stored in your SQLite database.
        </p>
        
        <div className="nav-tabs" style={{ marginBottom: '1rem' }}>
          <button
            className={`nav-tab ${activeTable === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTable('students')}
          >
            Students
          </button>
          <button
            className={`nav-tab ${activeTable === 'teachers' ? 'active' : ''}`}
            onClick={() => setActiveTable('teachers')}
          >
            Teachers
          </button>
          <button
            className={`nav-tab ${activeTable === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTable('courses')}
          >
            Courses
          </button>
          <button
            className={`nav-tab ${activeTable === 'courses_with_teachers' ? 'active' : ''}`}
            onClick={() => setActiveTable('courses_with_teachers')}
          >
            Courses + Teachers (JOIN)
          </button>
        </div>
      </div>

      <div className="content">
        {renderTable(data, columns, tableName)}
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4>SQL Query Information:</h4>
          <p style={{ margin: '0.5rem 0', fontFamily: 'monospace', background: '#e9ecef', padding: '0.5rem', borderRadius: '4px' }}>
            {activeTable === 'students' && 'SELECT * FROM student;'}
            {activeTable === 'teachers' && 'SELECT * FROM teacher;'}
            {activeTable === 'courses' && 'SELECT * FROM course;'}
            {activeTable === 'courses_with_teachers' && 
              `SELECT c.*, t.name as teacher_name, t.subject as teacher_subject 
               FROM course c 
               JOIN teacher t ON c.teacher_id = t.id;`}
          </p>
        </div>

        <div style={{ marginTop: '1rem', padding: '1rem', background: '#e7f3ff', borderRadius: '8px' }}>
          <h4>Database Statistics:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0066cc' }}>{students.length}</div>
              <div>Students</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0066cc' }}>{teachers.length}</div>
              <div>Teachers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0066cc' }}>{courses.length}</div>
              <div>Courses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseViewer;
