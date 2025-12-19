# SQL Queries for School Management Database

This document contains useful SQL queries you can run on your school management database.

## Database Structure

### Tables:
- **student**: Student information
- **teacher**: Teacher information  
- **course**: Course information

### Student Table Schema:
```sql
CREATE TABLE student (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Teacher Table Schema:
```sql
CREATE TABLE teacher (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    experience INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Course Table Schema:
```sql
CREATE TABLE course (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    teacher_id INTEGER NOT NULL,
    credits INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id)
);
```

## Basic Queries

### View All Data
```sql
-- All students
SELECT * FROM student;

-- All teachers
SELECT * FROM teacher;

-- All courses
SELECT * FROM course;
```

### Count Records
```sql
-- Count total students
SELECT COUNT(*) as total_students FROM student;

-- Count total teachers
SELECT COUNT(*) as total_teachers FROM teacher;

-- Count total courses
SELECT COUNT(*) as total_courses FROM course;
```

## Advanced Queries

### Students by Grade
```sql
-- Students grouped by grade
SELECT grade, COUNT(*) as student_count 
FROM student 
GROUP BY grade 
ORDER BY grade;

-- Students in specific grade
SELECT name, email, phone 
FROM student 
WHERE grade = '10th';
```

### Teachers by Subject
```sql
-- Teachers grouped by subject
SELECT subject, COUNT(*) as teacher_count 
FROM teacher 
GROUP BY subject 
ORDER BY subject;

-- Teachers teaching specific subject
SELECT name, email, experience 
FROM teacher 
WHERE subject = 'Mathematics';
```

### Courses with Teacher Information
```sql
-- Courses with teacher details (JOIN)
SELECT 
    c.name as course_name,
    c.description,
    c.credits,
    t.name as teacher_name,
    t.subject as teacher_subject
FROM course c
JOIN teacher t ON c.teacher_id = t.id;

-- Courses taught by specific teacher
SELECT c.name, c.credits, t.name as teacher_name
FROM course c
JOIN teacher t ON c.teacher_id = t.id
WHERE t.name = 'Brindha';
```

### Search and Filter
```sql
-- Search students by name
SELECT * FROM student 
WHERE name LIKE '%bharath%';

-- Find teachers with experience > 5 years
SELECT name, subject, experience 
FROM teacher 
WHERE experience > 5;

-- Find courses with more than 3 credits
SELECT name, credits, description 
FROM course 
WHERE credits > 3;
```

### Statistics and Reports
```sql
-- Average experience of teachers
SELECT AVG(experience) as avg_experience 
FROM teacher;

-- Total credits offered
SELECT SUM(credits) as total_credits 
FROM course;

-- Students by grade with percentages
SELECT 
    grade,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM student), 2) as percentage
FROM student 
GROUP BY grade 
ORDER BY grade;
```

### Date-based Queries
```sql
-- Students added today
SELECT * FROM student 
WHERE DATE(created_at) = DATE('now');

-- Students added in last 7 days
SELECT * FROM student 
WHERE created_at >= datetime('now', '-7 days');

-- Students by birth month
SELECT 
    strftime('%m', date_of_birth) as birth_month,
    COUNT(*) as count
FROM student 
GROUP BY birth_month 
ORDER BY birth_month;
```

## How to Run These Queries

### Method 1: Using Python Script
```bash
# Run single query
python run_sql.py "SELECT * FROM student;"

# Interactive mode
python run_sql.py
```

### Method 2: Using Database Viewer
1. Open your web application: http://localhost:3000
2. Click on "Database Viewer" tab
3. View tables in SQL format
4. See real-time data from your database

### Method 3: Direct SQLite (if installed)
```bash
sqlite3 school.db
.tables
SELECT * FROM student;
.quit
```

## Example Complex Queries

### School Overview Report
```sql
SELECT 
    'Students' as category,
    COUNT(*) as count
FROM student
UNION ALL
SELECT 
    'Teachers' as category,
    COUNT(*) as count
FROM teacher
UNION ALL
SELECT 
    'Courses' as category,
    COUNT(*) as count
FROM course;
```

### Teacher Workload
```sql
SELECT 
    t.name as teacher_name,
    t.subject,
    COUNT(c.id) as courses_teaching,
    SUM(c.credits) as total_credits
FROM teacher t
LEFT JOIN course c ON t.id = c.teacher_id
GROUP BY t.id, t.name, t.subject
ORDER BY courses_teaching DESC;
```

### Student Enrollment by Grade and Subject
```sql
-- This would require a student_course table for actual enrollment
-- For now, showing available courses by grade level
SELECT 
    s.grade,
    COUNT(DISTINCT s.id) as students_in_grade,
    COUNT(DISTINCT c.id) as available_courses
FROM student s
CROSS JOIN course c
GROUP BY s.grade
ORDER BY s.grade;
```

## Tips for Writing Queries

1. **Always use WHERE clauses** to filter data when possible
2. **Use JOINs** to combine related tables
3. **Use GROUP BY** for aggregations
4. **Use ORDER BY** to sort results
5. **Use LIMIT** to restrict results for large datasets
6. **Use LIKE** for pattern matching in text fields

## Common SQL Functions

- `COUNT()` - Count rows
- `SUM()` - Sum numeric values
- `AVG()` - Average numeric values
- `MIN()` / `MAX()` - Minimum/Maximum values
- `GROUP BY` - Group results
- `ORDER BY` - Sort results
- `WHERE` - Filter conditions
- `LIKE` - Pattern matching
- `JOIN` - Combine tables
