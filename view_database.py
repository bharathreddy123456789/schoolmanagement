import sqlite3

def view_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('school.db')
    
    print("=" * 60)
    print("SCHOOL MANAGEMENT DATABASE VIEWER")
    print("=" * 60)
    
    # Get all table names
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    print(f"\nFound {len(tables)} tables:")
    for table in tables:
        print(f"  - {table[0]}")
    
    print("\n" + "=" * 60)
    
    # Display each table
    for table_name in tables:
        table_name = table_name[0]
        print(f"\nTABLE: {table_name.upper()}")
        print("-" * 40)
        
        # Get table schema
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = cursor.fetchall()
        print("Columns:")
        for col in columns:
            print(f"  {col[1]} ({col[2]})")
        
        # Get table data
        cursor.execute(f"SELECT * FROM {table_name};")
        rows = cursor.fetchall()
        
        print(f"\nData ({len(rows)} rows):")
        if rows:
            # Get column names
            column_names = [description[0] for description in cursor.description]
            print(" | ".join(column_names))
            print("-" * (len(" | ".join(column_names))))
            
            for row in rows:
                print(" | ".join(str(cell) for cell in row))
        else:
            print("  (No data)")
        
        print("\n" + "=" * 60)
    
    # Show some useful SQL queries
    print("\nUSEFUL SQL QUERIES:")
    print("-" * 40)
    
    queries = [
        ("All Students", "SELECT * FROM student;"),
        ("All Teachers", "SELECT * FROM teacher;"),
        ("All Courses", "SELECT * FROM course;"),
        ("Students by Grade", "SELECT name, grade FROM student ORDER BY grade;"),
        ("Teachers by Subject", "SELECT name, subject FROM teacher ORDER BY subject;"),
        ("Courses with Teachers", """
            SELECT c.name as course_name, c.credits, t.name as teacher_name, t.subject 
            FROM course c 
            JOIN teacher t ON c.teacher_id = t.id;
        """),
        ("Student Count by Grade", """
            SELECT grade, COUNT(*) as count 
            FROM student 
            GROUP BY grade 
            ORDER BY grade;
        """)
    ]
    
    for query_name, query in queries:
        print(f"\n{query_name}:")
        print(f"SQL: {query.strip()}")
        try:
            cursor.execute(query)
            results = cursor.fetchall()
            if results:
                column_names = [description[0] for description in cursor.description]
                print("Result:")
                print(" | ".join(column_names))
                print("-" * (len(" | ".join(column_names))))
                for row in results:
                    print(" | ".join(str(cell) for cell in row))
            else:
                print("  (No results)")
        except Exception as e:
            print(f"  Error: {e}")
        print()
    
    conn.close()

if __name__ == "__main__":
    view_database()
