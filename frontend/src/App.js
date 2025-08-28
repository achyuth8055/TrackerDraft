import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles.css';

import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AIAssistant from './components/AIAssistant';

import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DailyTasks from './pages/DailyTasks.jsx';
import StudyGroups from './pages/StudyGroups.jsx';
import StudyPlan from './pages/StudyPlan.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';

// This sub-component is used to access the AuthContext from within the Router
const AppContent = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/daily-tasks" element={<DailyTasks />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/study-plan" element={<StudyPlan />} />
        </Route>
      </Routes>
      
      {token && <AIAssistant />}
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router> {/* <-- Router is the outermost component */}
      <AuthProvider> {/* <-- Provider is inside the Router */}
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;