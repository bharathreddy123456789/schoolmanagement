#!/usr/bin/env python3
"""
Firebase Configuration Setup Script
This script helps you configure Firebase for your School Management System
"""

import os
import re

def get_firebase_config():
    print("🔥 Firebase Configuration Setup")
    print("=" * 50)
    print("Please provide your Firebase project configuration details.")
    print("You can find these in your Firebase Console > Project Settings > General")
    print()
    
    config = {}
    
    # Get Firebase configuration
    config['apiKey'] = input("Enter your API Key: ").strip()
    config['authDomain'] = input("Enter your Auth Domain (e.g., project-id.firebaseapp.com): ").strip()
    config['projectId'] = input("Enter your Project ID: ").strip()
    config['storageBucket'] = input("Enter your Storage Bucket (e.g., project-id.appspot.com): ").strip()
    config['messagingSenderId'] = input("Enter your Messaging Sender ID: ").strip()
    config['appId'] = input("Enter your App ID: ").strip()
    
    return config

def update_firebase_config(config):
    """Update the firebase.js file with the provided configuration"""
    
    firebase_js_content = f'''import {{ initializeApp }} from 'firebase/app';
import {{ getAuth }} from 'firebase/auth';
import {{ getFirestore }} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {{
  apiKey: "{config['apiKey']}",
  authDomain: "{config['authDomain']}",
  projectId: "{config['projectId']}",
  storageBucket: "{config['storageBucket']}",
  messagingSenderId: "{config['messagingSenderId']}",
  appId: "{config['appId']}"
}};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
'''
    
    try:
        with open('src/firebase.js', 'w') as f:
            f.write(firebase_js_content)
        print("✅ Firebase configuration updated successfully!")
        return True
    except Exception as e:
        print(f"❌ Error updating Firebase configuration: {e}")
        return False

def create_env_file(config):
    """Create .env file with Firebase configuration"""
    
    env_content = f'''# Firebase Configuration
REACT_APP_FIREBASE_API_KEY={config['apiKey']}
REACT_APP_FIREBASE_AUTH_DOMAIN={config['authDomain']}
REACT_APP_FIREBASE_PROJECT_ID={config['projectId']}
REACT_APP_FIREBASE_STORAGE_BUCKET={config['storageBucket']}
REACT_APP_FIREBASE_MESSAGING_SENDER_ID={config['messagingSenderId']}
REACT_APP_FIREBASE_APP_ID={config['appId']}
'''
    
    try:
        with open('.env', 'w') as f:
            f.write(env_content)
        print("✅ .env file created successfully!")
        return True
    except Exception as e:
        print(f"❌ Error creating .env file: {e}")
        return False

def main():
    print("🚀 School Management System - Firebase Setup")
    print("=" * 50)
    print()
    
    # Check if firebase.js exists
    if not os.path.exists('src/firebase.js'):
        print("❌ firebase.js file not found!")
        print("Please make sure you're running this script from the project root directory.")
        return
    
    print("This script will help you configure Firebase Authentication for your School Management System.")
    print()
    
    # Get Firebase configuration
    config = get_firebase_config()
    
    print()
    print("📝 Configuration Summary:")
    print("-" * 30)
    for key, value in config.items():
        print(f"{key}: {value}")
    print()
    
    # Confirm configuration
    confirm = input("Is this configuration correct? (y/n): ").strip().lower()
    if confirm != 'y':
        print("❌ Configuration cancelled.")
        return
    
    # Update firebase.js
    if update_firebase_config(config):
        print()
        
        # Ask about .env file
        create_env = input("Would you like to create a .env file for better security? (y/n): ").strip().lower()
        if create_env == 'y':
            create_env_file(config)
        
        print()
        print("🎉 Firebase setup completed!")
        print()
        print("Next steps:")
        print("1. Go to Firebase Console > Authentication > Sign-in method")
        print("2. Enable Email/Password authentication")
        print("3. Create demo users:")
        print("   - admin@school.com / admin123")
        print("   - teacher@school.com / teacher123")
        print("   - student@school.com / student123")
        print("4. Run: npm start")
        print("5. Go to http://localhost:3000")
        print()
        print("📚 For detailed instructions, see FIREBASE_SETUP.md")
    else:
        print("❌ Setup failed. Please check your configuration and try again.")

if __name__ == "__main__":
    main()
