import sqlite3
import sys

def run_sql_query(query):
    """Run a custom SQL query on the school database"""
    try:
        conn = sqlite3.connect('school.db')
        cursor = conn.cursor()
        
        print(f"Running query: {query}")
        print("-" * 50)
        
        cursor.execute(query)
        results = cursor.fetchall()
        
        if results:
            # Get column names
            column_names = [description[0] for description in cursor.description]
            print(" | ".join(column_names))
            print("-" * (len(" | ".join(column_names))))
            
            for row in results:
                print(" | ".join(str(cell) for cell in row))
            
            print(f"\nQuery returned {len(results)} rows.")
        else:
            print("Query executed successfully. No results returned.")
            
        conn.close()
        
    except Exception as e:
        print(f"Error executing query: {e}")

def interactive_mode():
    """Interactive SQL query mode"""
    print("SQL Query Runner for School Management Database")
    print("=" * 50)
    print("Type 'exit' to quit, 'help' for example queries")
    print()
    
    while True:
        try:
            query = input("SQL> ").strip()
            
            if query.lower() == 'exit':
                break
            elif query.lower() == 'help':
                print("\nExample queries:")
                print("\n=== BASIC QUERIES ===")
                print("  SELECT * FROM student;")
                print("  SELECT * FROM teacher;")
                print("  SELECT * FROM course;")
                print("  SELECT COUNT(*) as total_students FROM student;")
                
                print("\n=== STUDENT QUERIES ===")
                print("  SELECT * FROM student WHERE grade = '10th';")
                print("  SELECT name, grade, email FROM student ORDER BY grade;")
                print("  SELECT grade, COUNT(*) as student_count FROM student GROUP BY grade;")
                print("  SELECT * FROM student WHERE name LIKE '%john%';")
                print("  SELECT * FROM student WHERE date_of_birth > '2005-01-01';")
                
                print("\n=== TEACHER QUERIES ===")
                print("  SELECT * FROM teacher WHERE subject = 'Mathematics';")
                print("  SELECT name, subject, experience FROM teacher ORDER BY experience DESC;")
                print("  SELECT subject, COUNT(*) as teacher_count FROM teacher GROUP BY subject;")
                print("  SELECT * FROM teacher WHERE experience > 5;")
                
                print("\n=== COURSE QUERIES ===")
                print("  SELECT c.name, c.credits, t.name as teacher FROM course c JOIN teacher t ON c.teacher_id = t.id;")
                print("  SELECT * FROM course WHERE credits > 3;")
                print("  SELECT t.name as teacher, COUNT(c.id) as courses_teaching FROM teacher t LEFT JOIN course c ON t.id = c.teacher_id GROUP BY t.id;")
                
                print("\n=== ADVANCED QUERIES ===")
                print("  SELECT s.grade, COUNT(*) as students, AVG(c.credits) as avg_credits FROM student s, course c GROUP BY s.grade;")
                print("  SELECT t.subject, COUNT(c.id) as courses, SUM(c.credits) as total_credits FROM teacher t LEFT JOIN course c ON t.id = c.teacher_id GROUP BY t.subject;")
                print("  SELECT * FROM student WHERE created_at >= date('now', '-7 days');")
                
                print("\n=== QUICK COMMANDS ===")
                print("  students_by_grade    - Show students grouped by grade")
                print("  teachers_by_subject  - Show teachers grouped by subject")
                print("  courses_with_teachers - Show courses with teacher details")
                print("  recent_students     - Show students added in last 7 days")
                print("  teacher_workload    - Show teacher course assignments")
                print("  student_stats       - Show detailed student statistics by grade")
                print("  course_stats        - Show course statistics by subject")
                print("  all_data           - Show all students, teachers, and courses")
                print()
            elif query.lower() == 'students_by_grade':
                run_sql_query("SELECT grade, COUNT(*) as student_count FROM student GROUP BY grade ORDER BY grade;")
                print()
            elif query.lower() == 'teachers_by_subject':
                run_sql_query("SELECT subject, COUNT(*) as teacher_count FROM teacher GROUP BY subject ORDER BY subject;")
                print()
            elif query.lower() == 'courses_with_teachers':
                run_sql_query("SELECT c.name as course_name, c.credits, t.name as teacher_name, t.subject FROM course c JOIN teacher t ON c.teacher_id = t.id;")
                print()
            elif query.lower() == 'recent_students':
                run_sql_query("SELECT name, grade, email, created_at FROM student WHERE created_at >= date('now', '-7 days') ORDER BY created_at DESC;")
                print()
            elif query.lower() == 'teacher_workload':
                run_sql_query("SELECT t.name as teacher, t.subject, COUNT(c.id) as courses_teaching, SUM(c.credits) as total_credits FROM teacher t LEFT JOIN course c ON t.id = c.teacher_id GROUP BY t.id ORDER BY courses_teaching DESC;")
                print()
            elif query.lower() == 'student_stats':
                run_sql_query("SELECT grade, COUNT(*) as students, MIN(date_of_birth) as youngest, MAX(date_of_birth) as oldest FROM student GROUP BY grade ORDER BY grade;")
                print()
            elif query.lower() == 'course_stats':
                run_sql_query("SELECT t.subject, COUNT(c.id) as courses, AVG(c.credits) as avg_credits, SUM(c.credits) as total_credits FROM teacher t LEFT JOIN course c ON t.id = c.teacher_id GROUP BY t.subject ORDER BY courses DESC;")
                print()
            elif query.lower() == 'all_data':
                print("=== ALL STUDENTS ===")
                run_sql_query("SELECT * FROM student;")
                print("\n=== ALL TEACHERS ===")
                run_sql_query("SELECT * FROM teacher;")
                print("\n=== ALL COURSES ===")
                run_sql_query("SELECT * FROM course;")
                print()
            elif query:
                run_sql_query(query)
                print()
                
        except KeyboardInterrupt:
            print("\nExiting...")
            break
        except Exception as e:
            print(f"Error: {e}")

def execute_quick_command(command):
    """Execute quick commands"""
    if command.lower() == 'students_by_grade':
        run_sql_query("SELECT grade, COUNT(*) as student_count FROM student GROUP BY grade ORDER BY grade;")
    elif command.lower() == 'teachers_by_subject':
        run_sql_query("SELECT subject, COUNT(*) as teacher_count FROM teacher GROUP BY subject ORDER BY subject;")
    elif command.lower() == 'courses_with_teachers':
        run_sql_query("SELECT c.name as course_name, c.credits, t.name as teacher_name, t.subject FROM course c JOIN teacher t ON c.teacher_id = t.id;")
    elif command.lower() == 'recent_students':
        run_sql_query("SELECT name, grade, email, created_at FROM student WHERE created_at >= date('now', '-7 days') ORDER BY created_at DESC;")
    elif command.lower() == 'teacher_workload':
        run_sql_query("SELECT t.name as teacher, t.subject, COUNT(c.id) as courses_teaching, SUM(c.credits) as total_credits FROM teacher t LEFT JOIN course c ON t.id = c.teacher_id GROUP BY t.id ORDER BY courses_teaching DESC;")
    elif command.lower() == 'student_stats':
        run_sql_query("SELECT grade, COUNT(*) as students, MIN(date_of_birth) as youngest, MAX(date_of_birth) as oldest FROM student GROUP BY grade ORDER BY grade;")
    elif command.lower() == 'course_stats':
        run_sql_query("SELECT t.subject, COUNT(c.id) as courses, AVG(c.credits) as avg_credits, SUM(c.credits) as total_credits FROM teacher t LEFT JOIN course c ON t.id = c.teacher_id GROUP BY t.subject ORDER BY courses DESC;")
    elif command.lower() == 'all_data':
        print("=== ALL STUDENTS ===")
        run_sql_query("SELECT * FROM student;")
        print("\n=== ALL TEACHERS ===")
        run_sql_query("SELECT * FROM teacher;")
        print("\n=== ALL COURSES ===")
        run_sql_query("SELECT * FROM course;")
    else:
        print(f"Unknown command: {command}")
        print("Available commands: students_by_grade, teachers_by_subject, courses_with_teachers, recent_students, teacher_workload, student_stats, course_stats, all_data")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Run query or command from command line
        command = " ".join(sys.argv[1:])
        if command.lower() in ['students_by_grade', 'teachers_by_subject', 'courses_with_teachers', 'recent_students', 'teacher_workload', 'student_stats', 'course_stats', 'all_data']:
            execute_quick_command(command)
        else:
            run_sql_query(command)
    else:
        # Interactive mode
        interactive_mode()
