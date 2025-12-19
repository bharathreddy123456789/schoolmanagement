#!/usr/bin/env python3
"""
Demo User Creation Script
This script helps you create demo users in Firebase Authentication
"""

import requests
import json

def create_demo_users():
    print("👥 Creating Demo Users for School Management System")
    print("=" * 50)
    print()
    print("This script will help you create demo users in Firebase Authentication.")
    print("You'll need to use the Firebase Console to create these users manually.")
    print()
    
    demo_users = [
        {
            "email": "admin@school.com",
            "password": "admin123",
            "role": "Administrator",
            "description": "Full access to all features"
        },
        {
            "email": "teacher@school.com", 
            "password": "teacher123",
            "role": "Teacher",
            "description": "Can manage students and courses"
        },
        {
            "email": "student@school.com",
            "password": "student123", 
            "role": "Student",
            "description": "Can view their own information"
        }
    ]
    
    print("📋 Demo Users to Create:")
    print("-" * 30)
    for i, user in enumerate(demo_users, 1):
        print(f"{i}. {user['email']}")
        print(f"   Password: {user['password']}")
        print(f"   Role: {user['role']}")
        print(f"   Description: {user['description']}")
        print()
    
    print("🔧 How to Create These Users:")
    print("-" * 30)
    print("1. Go to Firebase Console: https://console.firebase.google.com/")
    print("2. Select your project")
    print("3. Go to Authentication > Users")
    print("4. Click 'Add user' for each user above")
    print("5. Enter the email and password for each user")
    print("6. Click 'Add user' to create")
    print()
    
    print("✅ Alternative: Use the Signup Page")
    print("-" * 30)
    print("1. Start your application: npm start")
    print("2. Go to http://localhost:3000/signup")
    print("3. Create accounts using the signup form")
    print("4. Use the same email/password combinations above")
    print()
    
    print("🧪 Testing the Authentication:")
    print("-" * 30)
    print("1. Go to http://localhost:3000")
    print("2. You should be redirected to the login page")
    print("3. Use any of the demo credentials above")
    print("4. You should be logged in and redirected to the dashboard")
    print()
    
    print("📚 For more details, see FIREBASE_SETUP.md")

if __name__ == "__main__":
    create_demo_users()
