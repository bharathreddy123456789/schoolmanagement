import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentManagement = ({ onDataChange }) => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    date_of_birth: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      console.log('Fetching students...');
      const response = await axios.get('/api/students');
      console.log('Students response:', response.data);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await axios.put(`/api/students/${editingStudent.id}`, formData);
      } else {
        await axios.post('/api/students', formData);
      }
      fetchStudents();
      onDataChange();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Error saving student. Please try again.');
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      grade: student.grade,
      date_of_birth: student.date_of_birth
    });
    setShowModal(true);
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/api/students/${studentId}`);
        fetchStudents();
        onDataChange();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      grade: '',
      date_of_birth: ''
    });
    setEditingStudent(null);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Student Management</h2>
        <button className="btn btn-primary" onClick={openModal}>
          Add New Student
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Grade</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {console.log('Rendering students table with data:', students)}
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                No students found. Add some students to see them here.
              </td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.grade}</td>
                <td>{new Date(student.date_of_birth).toLocaleDateString()}</td>
                <td>
                  <div className="actions">
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Grade:</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="1st">1st Grade</option>
                  <option value="2nd">2nd Grade</option>
                  <option value="3rd">3rd Grade</option>
                  <option value="4th">4th Grade</option>
                  <option value="5th">5th Grade</option>
                  <option value="6th">6th Grade</option>
                  <option value="7th">7th Grade</option>
                  <option value="8th">8th Grade</option>
                  <option value="9th">9th Grade</option>
                  <option value="10th">10th Grade</option>
                  <option value="11th">11th Grade</option>
                  <option value="12th">12th Grade</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingStudent ? 'Update' : 'Add'} Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
