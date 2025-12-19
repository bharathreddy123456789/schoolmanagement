# School Management System

A comprehensive school management system built with React frontend and Flask backend with SQLite database. This system allows you to manage students, teachers, and courses efficiently.

## Features

### Student Management
- Add new students with personal information
- Edit existing student records
- Delete student records
- View all students in a table format
- Fields: Name, Email, Phone, Grade, Date of Birth

### Teacher Management
- Add new teachers with subject specialization
- Edit existing teacher records
- Delete teacher records
- View all teachers in a table format
- Fields: Name, Email, Phone, Subject, Experience (Years)

### Course Management
- Create new courses and assign teachers
- Edit existing course information
- Delete course records
- View all courses with assigned teachers
- Fields: Course Name, Description, Teacher, Credits

### Dashboard
- Overview of total students, teachers, and courses
- Quick navigation to different management sections
- Real-time statistics

## Technology Stack

- **Frontend**: React 18, Axios for API calls
- **Backend**: Flask, Flask-SQLAlchemy, Flask-CORS
- **Database**: SQLite
- **Styling**: Custom CSS with responsive design

## Prerequisites

- Python 3.7 or higher
- Node.js 14 or higher
- npm or yarn

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd school-management-system
```

### 2. Backend Setup (Flask)

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask application:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup (React)

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the React development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. The application will automatically connect to the Flask backend
3. Use the navigation tabs to switch between different management sections:
   - **Dashboard**: View overview statistics
   - **Students**: Manage student records
   - **Teachers**: Manage teacher records
   - **Courses**: Manage course records

### Adding New Records

1. Click the "Add New [Student/Teacher/Course]" button
2. Fill in the required information in the modal form
3. Click "Add" to save the record

### Editing Records

1. Click the "Edit" button next to any record in the table
2. Modify the information in the modal form
3. Click "Update" to save changes

### Deleting Records

1. Click the "Delete" button next to any record
2. Confirm the deletion in the popup dialog

## API Endpoints

The Flask backend provides the following REST API endpoints:

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create a new student
- `PUT /api/students/<id>` - Update a student
- `DELETE /api/students/<id>` - Delete a student

### Teachers
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Create a new teacher
- `PUT /api/teachers/<id>` - Update a teacher
- `DELETE /api/teachers/<id>` - Delete a teacher

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `PUT /api/courses/<id>` - Update a course
- `DELETE /api/courses/<id>` - Delete a course

### Health Check
- `GET /api/health` - Check API status

## Database Schema

The SQLite database contains three main tables:

### Students Table
- id (Primary Key)
- name
- email (Unique)
- phone
- grade
- date_of_birth
- created_at

### Teachers Table
- id (Primary Key)
- name
- email (Unique)
- phone
- subject
- experience
- created_at

### Courses Table
- id (Primary Key)
- name
- description
- teacher_id (Foreign Key)
- credits
- created_at

## Project Structure

```
school-management-system/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies
├── README.md             # Project documentation
├── public/
│   └── index.html        # HTML template
└── src/
    ├── index.js          # React entry point
    ├── index.css         # Global styles
    ├── App.js            # Main React component
    └── components/
        ├── Dashboard.js          # Dashboard component
        ├── StudentManagement.js  # Student management
        ├── TeacherManagement.js  # Teacher management
        └── CourseManagement.js   # Course management
```

## Features Included

✅ **Student Management**: Complete CRUD operations for student records
✅ **Teacher Management**: Complete CRUD operations for teacher records  
✅ **Course Management**: Complete CRUD operations for course records
✅ **Dashboard**: Overview statistics and navigation
✅ **Responsive Design**: Works on desktop and mobile devices
✅ **Modal Forms**: Clean, user-friendly forms for data entry
✅ **Data Validation**: Form validation and error handling
✅ **Real-time Updates**: Statistics update automatically after changes

## Future Enhancements

- User authentication and authorization
- Grade management and assignments
- Attendance tracking
- Report generation
- Bulk import/export functionality
- Advanced search and filtering
- Email notifications

## Troubleshooting

### Common Issues

1. **Backend not starting**: Ensure Python dependencies are installed and port 5000 is available
2. **Frontend not connecting**: Check that the Flask backend is running on port 5000
3. **Database errors**: The SQLite database will be created automatically on first run
4. **CORS errors**: Ensure Flask-CORS is properly installed and configured

### Port Conflicts

If you encounter port conflicts:
- Backend: Change port in `app.py` (line: `app.run(debug=True, port=5000)`)
- Frontend: Change port by setting `PORT=3001 npm start` or modify package.json

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
