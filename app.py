from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "school.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    grade = db.Column(db.String(10), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'grade': self.grade,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    subject = db.Column(db.String(50), nullable=False)
    experience = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'subject': self.subject,
            'experience': self.experience,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=False)
    credits = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    teacher = db.relationship('Teacher', backref=db.backref('courses', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'teacher_id': self.teacher_id,
            'teacher_name': self.teacher.name if self.teacher else None,
            'credits': self.credits,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# API Routes for Students
@app.route('/api/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([student.to_dict() for student in students])

@app.route('/api/students', methods=['POST'])
def create_student():
    data = request.get_json()
    student = Student(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        grade=data['grade'],
        date_of_birth=datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
    )
    db.session.add(student)
    db.session.commit()
    return jsonify(student.to_dict()), 201

@app.route('/api/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    student = Student.query.get_or_404(student_id)
    data = request.get_json()
    student.name = data['name']
    student.email = data['email']
    student.phone = data['phone']
    student.grade = data['grade']
    student.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
    db.session.commit()
    return jsonify(student.to_dict())

@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = Student.query.get_or_404(student_id)
    db.session.delete(student)
    db.session.commit()
    return '', 204

# API Routes for Teachers
@app.route('/api/teachers', methods=['GET'])
def get_teachers():
    teachers = Teacher.query.all()
    return jsonify([teacher.to_dict() for teacher in teachers])

@app.route('/api/teachers', methods=['POST'])
def create_teacher():
    data = request.get_json()
    teacher = Teacher(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        subject=data['subject'],
        experience=data['experience']
    )
    db.session.add(teacher)
    db.session.commit()
    return jsonify(teacher.to_dict()), 201

@app.route('/api/teachers/<int:teacher_id>', methods=['PUT'])
def update_teacher(teacher_id):
    teacher = Teacher.query.get_or_404(teacher_id)
    data = request.get_json()
    teacher.name = data['name']
    teacher.email = data['email']
    teacher.phone = data['phone']
    teacher.subject = data['subject']
    teacher.experience = data['experience']
    db.session.commit()
    return jsonify(teacher.to_dict())

@app.route('/api/teachers/<int:teacher_id>', methods=['DELETE'])
def delete_teacher(teacher_id):
    teacher = Teacher.query.get_or_404(teacher_id)
    db.session.delete(teacher)
    db.session.commit()
    return '', 204

# API Routes for Courses
@app.route('/api/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([course.to_dict() for course in courses])

@app.route('/api/courses', methods=['POST'])
def create_course():
    data = request.get_json()
    course = Course(
        name=data['name'],
        description=data['description'],
        teacher_id=data['teacher_id'],
        credits=data['credits']
    )
    db.session.add(course)
    db.session.commit()
    return jsonify(course.to_dict()), 201

@app.route('/api/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    course = Course.query.get_or_404(course_id)
    data = request.get_json()
    course.name = data['name']
    course.description = data['description']
    course.teacher_id = data['teacher_id']
    course.credits = data['credits']
    db.session.commit()
    return jsonify(course.to_dict())

@app.route('/api/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return '', 204

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'School Management API is running'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
