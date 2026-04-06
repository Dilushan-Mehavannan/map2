import { Link, useLocation } from 'react-router-dom';
import { MapPin, LogOut, Calendar, Compass, User, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const TouristNavbar = () => {
  const location = useLocation();
  const { currentUser, currentVisitPlan, logout } = useApp();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-tourist">
      <div className="nav-container">
        <div className="nav-brand brand-tourist">
          <Compass className="nav-icon nav-icon-tourist" />
          <div>
            <h1>Explorer</h1>
            <p>Discover Sri Lanka</p>
          </div>
        </div>

        <div className="nav-links nav-links-tourist">
          <Link to="/" className={isActive('/') ? 'nav-link active nav-link-tourist' : 'nav-link nav-link-tourist'}>
            <MapPin size={20} /> Explore
          </Link>

          <Link to="/visit-plan" className={isActive('/visit-plan') ? 'nav-link active nav-link-tourist' : 'nav-link nav-link-tourist'}>
            <Calendar size={20} /> My Itinerary
            {currentVisitPlan.length > 0 && <span className="badge-tourist">{currentVisitPlan.length}</span>}
          </Link>

          <Link to="/saved-itineraries" className={isActive('/saved-itineraries') ? 'nav-link active nav-link-tourist' : 'nav-link nav-link-tourist'}>
            <BookOpen size={20} /> Saved Plans
          </Link>

          <Link to="/tourist" className={isActive('/tourist') ? 'nav-link active nav-link-tourist' : 'nav-link nav-link-tourist'}>
            <User size={20} /> Profile
          </Link>
        </div>

        <div className="user-actions user-actions-tourist">
          <div className="tourist-info">
            <p className="tourist-greeting">Welcome, {currentUser?.name.split(' ')[0]}!</p>
          </div>
          <button className="btn-logout-tourist" onClick={logout}>
            <LogOut size={18} /> Exit
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TouristNavbar;
