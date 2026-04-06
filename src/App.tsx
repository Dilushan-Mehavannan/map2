import type { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import PlacesList from './pages/PlacesList.jsx';
import VisitPlan from './pages/VisitPlan.jsx';
import SavedItineraries from './pages/SavedItineraries.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import TouristDashboard from './pages/TouristDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import './App.css';

const ProtectedRoute = ({ children, role }: { children: ReactNode; role: 'tourist' | 'admin' | 'any'; }) => {
  const { isAuthenticated, currentUser } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'any' && currentUser?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<PlacesList />} />
              <Route path="/visit-plan" element={<ProtectedRoute role="any"><VisitPlan /></ProtectedRoute>} />
              <Route path="/saved-itineraries" element={<ProtectedRoute role="tourist"><SavedItineraries /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tourist" element={<ProtectedRoute role="tourist"><TouristDashboard /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
