import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherManagement = ({ onDataChange }) => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    experience: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
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
      if (editingTeacher) {
        await axios.put(`/api/teachers/${editingTeacher.id}`, formData);
      } else {
        await axios.post('/api/teachers', formData);
      }
      fetchTeachers();
      onDataChange();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving teacher:', error);
      alert('Error saving teacher. Please try again.');
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
      experience: teacher.experience
    });
    setShowModal(true);
  };

  const handleDelete = async (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await axios.delete(`/api/teachers/${teacherId}`);
        fetchTeachers();
        onDataChange();
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Error deleting teacher. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      experience: ''
    });
    setEditingTeacher(null);
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
        <h2>Teacher Management</h2>
        <button className="btn btn-primary" onClick={openModal}>
          Add New Teacher
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Experience (Years)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone}</td>
              <td>{teacher.subject}</td>
              <td>{teacher.experience}</td>
              <td>
                <div className="actions">
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handleEdit(teacher)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(teacher.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</h2>
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
                <label>Subject:</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                  <option value="Physical Education">Physical Education</option>
                </select>
              </div>
              <div className="form-group">
                <label>Experience (Years):</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTeacher ? 'Update' : 'Add'} Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
