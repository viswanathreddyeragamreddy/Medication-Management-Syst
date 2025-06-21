import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Medications from './components/Medications';
import CaretakerDashboard from './components/CaretakerDashboard';

const queryClient = new QueryClient();

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return token && role === roleRequired ? children : <Navigate to="/login" />;
};

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleAuth = (loggedInRole) => {
    setRole(loggedInRole);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleAuth} />} />
          <Route path="/signup" element={<SignupForm onSignup={handleAuth} />} />
          <Route
            path="/patient"
            element={<PrivateRoute roleRequired="patient"><Medications /></PrivateRoute>}
          />
          <Route
            path="/caretaker"
            element={<PrivateRoute roleRequired="caretaker"><CaretakerDashboard /></PrivateRoute>}
          />
          <Route path="*" element={<Navigate to={role === 'patient' ? '/patient' : '/caretaker'} />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
