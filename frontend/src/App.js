import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/styles.css';

import { AuthProvider } from './context/AuthContext';

// Import the new ProtectedRoute component
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DailyTasks from './pages/DailyTasks.jsx';
import StudyGroups from './pages/StudyGroups.jsx';
import StudyPlan from './pages/StudyPlan.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* --- Protected Routes --- */}
            {/* All routes nested inside here will require a user to be logged in */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/daily-tasks" element={<DailyTasks />} />
              <Route path="/study-groups" element={<StudyGroups />} />
              <Route path="/study-plan" element={<StudyPlan />} />
            </Route>
            
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;