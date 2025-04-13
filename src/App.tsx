import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authService } from './services/authService';
import { UserProvider } from './context/UserContext';
import { ConnectionProvider } from './context/ConnectionContext';
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
import RoadmapGenerator from './components/RoadmapGenerator';
import Networking from './components/Networking';
import CommunityGroup from './components/CommunityGroup';
import EventRegistration from './components/EventRegistration';
import Login from './components/Login';
import Register from './components/Register';

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

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = authService.getCurrentUser();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <UserProvider>
      <ConnectionProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout userRole={authService.getRole() || 'student'} />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="meeting" element={<MeetingPage />} />
              <Route path="resume" element={<ResumeBuilder />} />
              <Route path="interview" element={<InterviewPrep />} />
              <Route path="roadmap" element={<RoadmapGenerator />} />
              <Route path="networking" element={<Networking />} />
              <Route path="networking/community/:communityId" element={<CommunityGroup />} />
              <Route path="networking/event/:eventId" element={<EventRegistration />} />
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
      </ConnectionProvider>
    </UserProvider>
  );
}

export default App;