import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/authService';
import { UserProvider } from './context/UserContext';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MeetingPage from './components/MeetingPage';
import ResumeBuilder from './components/ResumeBuilder';
import InterviewPrep from './components/InterviewPrep';
import Mentors from './components/Mentors';
import Webinars from './components/Webinars';
import Settings from './components/Settings';
<<<<<<< HEAD
=======
import RoadmapGenerator from './components/RoadmapGenerator';
>>>>>>> d9f56724a9ec3a562801afc980f51b3566d24487

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Role-based Route Component
const RoleBasedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: ('student' | 'mentor')[];
}) => {
  const userRole = authService.getRole();
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout userRole={authService.getRole() || 'student'} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="meeting" element={<MeetingPage />} />
            <Route path="resume" element={<ResumeBuilder />} />
            <Route path="interview" element={<InterviewPrep />} />
<<<<<<< HEAD
=======
            <Route path="roadmap" element={<RoadmapGenerator />} />
>>>>>>> d9f56724a9ec3a562801afc980f51b3566d24487
            <Route path="settings" element={<Settings />} />

            {/* Student-specific routes */}
            <Route
              path="mentors"
              element={
                <RoleBasedRoute allowedRoles={['student', 'mentor']}>
                  <Mentors />
                </RoleBasedRoute>
              }
            />
            <Route
              path="webinars"
              element={
                <RoleBasedRoute allowedRoles={['student', 'mentor']}>
                  <Webinars />
                </RoleBasedRoute>
              }
            />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;