import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import PlacesList from './pages/PlacesList.jsx';
import VisitPlan from './pages/VisitPlan.jsx';
import Admin from './pages/Admin.jsx';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<PlacesList />} />
              <Route path="/visit-plan" element={<VisitPlan />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
