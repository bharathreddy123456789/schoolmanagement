# SQL Query Examples for School Management System

This document provides practical SQL queries for analyzing your school data.

## Quick Commands

Run these commands directly with `python run_sql.py <command>`:

```bash
# Student Analysis
python run_sql.py students_by_grade
python run_sql.py student_stats
python run_sql.py recent_students

# Teacher Analysis  
python run_sql.py teachers_by_subject
python run_sql.py teacher_workload

# Course Analysis
python run_sql.py courses_with_teachers
python run_sql.py course_stats

# Complete Overview
python run_sql.py all_data
```

## Student-Based Queries

### By Grade/Class
```sql
-- Students by grade
SELECT grade, COUNT(*) as student_count 
FROM student 
GROUP BY grade 
ORDER BY grade;

-- Students in specific grade
SELECT name, email, phone, date_of_birth 
FROM student 
WHERE grade = '10th';

-- Grade distribution with percentages
SELECT 
    grade,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM student), 2) as percentage
FROM student 
GROUP BY grade 
ORDER BY grade;
```

### By Age/Date
```sql
-- Students by birth year
SELECT 
    strftime('%Y', date_of_birth) as birth_year,
    COUNT(*) as student_count
FROM student 
GROUP BY birth_year 
ORDER BY birth_year;

-- Students born after specific date
SELECT name, grade, date_of_birth 
FROM student 
WHERE date_of_birth > '2005-01-01';

-- Recently added students
SELECT name, grade, email, created_at 
FROM student 
WHERE created_at >= date('now', '-7 days') 
ORDER BY created_at DESC;
```

### Search and Filter
```sql
-- Search students by name
SELECT * FROM student 
WHERE name LIKE '%john%';

-- Students with specific email domain
SELECT name, email, grade 
FROM student 
WHERE email LIKE '%@gmail.com';

-- Students by phone number pattern
SELECT name, phone, grade 
FROM student 
WHERE phone LIKE '123%';
```

## Teacher-Based Queries

### By Subject
```sql
-- Teachers by subject
SELECT subject, COUNT(*) as teacher_count 
FROM teacher 
GROUP BY subject 
ORDER BY subject;

-- Teachers teaching specific subject
SELECT name, email, experience 
FROM teacher 
WHERE subject = 'Mathematics';

-- Subject distribution
SELECT 
    subject,
    COUNT(*) as teachers,
    AVG(experience) as avg_experience
FROM teacher 
GROUP BY subject 
ORDER BY teachers DESC;
```

### By Experience
```sql
-- Teachers by experience level
SELECT 
    CASE 
        WHEN experience < 2 THEN 'New'
        WHEN experience < 5 THEN 'Intermediate'
        WHEN experience < 10 THEN 'Experienced'
        ELSE 'Senior'
    END as experience_level,
    COUNT(*) as count
FROM teacher 
GROUP BY experience_level;

-- Most experienced teachers
SELECT name, subject, experience 
FROM teacher 
ORDER BY experience DESC 
LIMIT 5;

-- Teachers with specific experience range
SELECT name, subject, experience 
FROM teacher 
WHERE experience BETWEEN 3 AND 7;
```

## Course-Based Queries

### Course Information
```sql
-- All courses with teacher details
SELECT 
    c.name as course_name,
    c.description,
    c.credits,
    t.name as teacher_name,
    t.subject as teacher_subject
FROM course c
JOIN teacher t ON c.teacher_id = t.id;

-- Courses by credit hours
SELECT name, credits, description 
FROM course 
ORDER BY credits DESC;

-- High-credit courses
SELECT name, credits, description 
FROM course 
WHERE credits > 3;
```

### Teacher Workload
```sql
-- Teacher course assignments
SELECT 
    t.name as teacher,
    t.subject,
    COUNT(c.id) as courses_teaching,
    SUM(c.credits) as total_credits
FROM teacher t
LEFT JOIN course c ON t.id = c.teacher_id
GROUP BY t.id 
ORDER BY courses_teaching DESC;

-- Teachers with no courses
SELECT t.name, t.subject 
FROM teacher t
LEFT JOIN course c ON t.id = c.teacher_id
WHERE c.id IS NULL;
```

## Advanced Analytics

### School Statistics
```sql
-- Overall school statistics
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

-- Grade-wise course availability
SELECT 
    s.grade,
    COUNT(DISTINCT s.id) as students,
    COUNT(DISTINCT c.id) as available_courses
FROM student s
CROSS JOIN course c
GROUP BY s.grade
ORDER BY s.grade;
```

### Subject Analysis
```sql
-- Subject popularity
SELECT 
    t.subject,
    COUNT(DISTINCT t.id) as teachers,
    COUNT(DISTINCT c.id) as courses,
    SUM(c.credits) as total_credits
FROM teacher t
LEFT JOIN course c ON t.id = c.teacher_id
GROUP BY t.subject
ORDER BY teachers DESC;

-- Average credits per subject
SELECT 
    t.subject,
    AVG(c.credits) as avg_credits,
    MIN(c.credits) as min_credits,
    MAX(c.credits) as max_credits
FROM teacher t
LEFT JOIN course c ON t.id = c.teacher_id
GROUP BY t.subject;
```

### Time-Based Analysis
```sql
-- Students added by month
SELECT 
    strftime('%Y-%m', created_at) as month,
    COUNT(*) as new_students
FROM student 
GROUP BY month 
ORDER BY month;

-- Recent activity
SELECT 
    'Students' as type,
    COUNT(*) as recent_additions
FROM student 
WHERE created_at >= date('now', '-30 days')
UNION ALL
SELECT 
    'Teachers' as type,
    COUNT(*) as recent_additions
FROM teacher 
WHERE created_at >= date('now', '-30 days')
UNION ALL
SELECT 
    'Courses' as type,
    COUNT(*) as recent_additions
FROM course 
WHERE created_at >= date('now', '-30 days');
```

## Reporting Queries

### Student Report
```sql
-- Complete student report
SELECT 
    s.name,
    s.grade,
    s.email,
    s.phone,
    s.date_of_birth,
    s.created_at
FROM student s
ORDER BY s.grade, s.name;
```

### Teacher Report
```sql
-- Complete teacher report
SELECT 
    t.name,
    t.subject,
    t.experience,
    t.email,
    t.phone,
    COUNT(c.id) as courses_teaching
FROM teacher t
LEFT JOIN course c ON t.id = c.teacher_id
GROUP BY t.id
ORDER BY t.subject, t.name;
```

### Course Report
```sql
-- Complete course report
SELECT 
    c.name as course,
    c.description,
    c.credits,
    t.name as teacher,
    t.subject as teacher_subject
FROM course c
JOIN teacher t ON c.teacher_id = t.id
ORDER BY t.subject, c.name;
```

## Interactive Mode

For interactive querying, run:
```bash
python run_sql.py
```

Then you can:
- Type `help` to see all available queries
- Type any SQL query directly
- Use quick commands like `students_by_grade`
- Type `exit` to quit

## Tips for Writing Queries

1. **Use WHERE clauses** to filter data
2. **Use JOINs** to combine related tables
3. **Use GROUP BY** for aggregations
4. **Use ORDER BY** to sort results
5. **Use LIMIT** to restrict large result sets
6. **Use LIKE** for pattern matching
7. **Use date functions** for time-based queries

## Common Patterns

### Counting Records
```sql
SELECT COUNT(*) FROM student;
SELECT COUNT(DISTINCT grade) FROM student;
```

### Finding Maximum/Minimum
```sql
SELECT MAX(experience) FROM teacher;
SELECT MIN(date_of_birth) FROM student;
```

### Pattern Matching
```sql
SELECT * FROM student WHERE name LIKE 'A%';
SELECT * FROM teacher WHERE subject LIKE '%Math%';
```

### Date Filtering
```sql
SELECT * FROM student WHERE date_of_birth > '2005-01-01';
SELECT * FROM student WHERE created_at >= date('now', '-30 days');
```
