# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for your School Management System.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `school-management-system` (or any name you prefer)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Get Your Firebase Configuration

1. In your Firebase project dashboard, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web icon (`</>`) to add a web app
5. Enter app nickname: `School Management System`
6. Check "Also set up Firebase Hosting" (optional)
7. Click "Register app"
8. Copy the Firebase configuration object

## Step 4: Update Firebase Configuration

1. Open `src/firebase.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 5: Install Dependencies

Run the following command to install Firebase:

```bash
npm install firebase
```

## Step 6: Create Demo Users

### Option A: Using Firebase Console
1. Go to Authentication > Users in your Firebase console
2. Click "Add user"
3. Create these demo users:
   - Email: `admin@school.com`, Password: `admin123`
   - Email: `teacher@school.com`, Password: `teacher123`
   - Email: `student@school.com`, Password: `student123`

### Option B: Using the Signup Page
1. Start your application: `npm start`
2. Go to `http://localhost:3000/signup`
3. Create accounts using the signup form

## Step 7: Test the Authentication

1. Start your application: `npm start`
2. Go to `http://localhost:3000`
3. You should be redirected to the login page
4. Use the demo credentials to log in
5. You should be redirected to the main dashboard

## Features Included

### ✅ Authentication Features:
- **Login/Logout**: Secure user authentication
- **Signup**: New user registration
- **Protected Routes**: Only authenticated users can access the main app
- **User Context**: User state management throughout the app
- **Auto-redirect**: Automatic redirection based on auth state

### ✅ Security Features:
- **Route Protection**: All main features require authentication
- **Session Management**: Automatic login state persistence
- **Error Handling**: Proper error messages for auth failures
- **Password Validation**: Minimum 6 characters for passwords

## File Structure

```
src/
├── firebase.js                 # Firebase configuration
├── contexts/
│   └── AuthContext.js         # Authentication context
├── components/
│   ├── Login.js               # Login component
│   ├── Signup.js              # Signup component
│   ├── PrivateRoute.js        # Route protection
│   └── Navigation.js          # Navigation with logout
└── App.js                     # Main app with routing
```

## Environment Variables (Optional)

For better security, you can use environment variables:

1. Create `.env` file in your project root:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

2. Update `src/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error**:
   - Check if your Firebase config is correct
   - Make sure you've installed Firebase: `npm install firebase`

2. **"Permission denied" error**:
   - Check Firebase Authentication rules
   - Make sure Email/Password is enabled

3. **"User not found" error**:
   - Create users in Firebase Console first
   - Or use the signup page to create accounts

4. **Routes not working**:
   - Make sure you have `react-router-dom` installed
   - Check if all imports are correct

### Testing Authentication:

1. **Test Login**: Try logging in with demo credentials
2. **Test Logout**: Click logout button and verify redirect
3. **Test Protected Routes**: Try accessing `/` without login
4. **Test Signup**: Create a new account and verify it works

## Next Steps

After setting up authentication, you can:

1. **Add User Roles**: Implement admin, teacher, student roles
2. **Add Profile Management**: Let users update their profiles
3. **Add Password Reset**: Implement forgot password functionality
4. **Add Social Login**: Google, Facebook, etc.
5. **Add User Management**: Admin panel to manage users

## Demo Credentials

Use these credentials for testing:
- **Admin**: admin@school.com / admin123
- **Teacher**: teacher@school.com / teacher123
- **Student**: student@school.com / student123

Remember to create these users in Firebase Authentication first!
