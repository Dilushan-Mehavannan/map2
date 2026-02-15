import { Link, useLocation } from 'react-router-dom';
import { MapPin, User, List, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const Navbar = () => {
  const location = useLocation();
  const { currentUser, setUserRole, currentVisitPlan } = useApp();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <MapPin className="nav-icon" />
          <h1>Sri Lanka Day Planner</h1>
        </div>
        
        <div className="nav-links">
          <Link to="/" className={isActive('/') ? 'nav-link active' : 'nav-link'}>
            <List size={20} />
            Places
          </Link>
          <Link to="/visit-plan" className={isActive('/visit-plan') ? 'nav-link active' : 'nav-link'}>
            <Calendar size={20} />
            My Visit Plan
            {currentVisitPlan.length > 0 && (
              <span className="badge">{currentVisitPlan.length}</span>
            )}
          </Link>
          {currentUser.role === 'admin' && (
            <Link to="/admin" className={isActive('/admin') ? 'nav-link active' : 'nav-link'}>
              <User size={20} />
              Admin
            </Link>
          )}
        </div>

        <div className="user-role">
          <select 
            value={currentUser.role} 
            onChange={(e) => setUserRole(e.target.value as 'tourist' | 'admin')}
            className="role-select"
          >
            <option value="tourist">Tourist</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
