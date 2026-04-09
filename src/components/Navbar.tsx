import { Link, useLocation } from 'react-router-dom';
import { MapPin, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import AdminNavbar from './AdminNavbar.jsx';
import TouristNavbar from './TouristNavbar.jsx';

const Navbar = () => {
  const location = useLocation();
  const { currentUser } = useApp();

  const isActive = (path: string) => location.pathname === path;

  // Show Admin navbar if user is admin
  if (currentUser?.role === 'admin') {
    return <AdminNavbar />;
  }

  // Show Tourist navbar if user is tourist
  if (currentUser?.role === 'tourist') {
    return <TouristNavbar />;
  }

  // Show Guest navbar if not logged in
  return (
    <nav className="navbar navbar-guest">
      <div className="nav-container">
        <div className="nav-brand brand-guest">
          <MapPin className="nav-icon nav-icon-guest" />
          <h1>Dream Tourist</h1>
        </div>

        <div className="nav-links nav-links-guest">
          <Link to="/" className={isActive('/') ? 'nav-link active nav-link-guest' : 'nav-link nav-link-guest'}>
            Browse
          </Link>
        </div>

        <div className="user-actions user-actions-guest">
          <Link to="/login" className="btn-login-guest">
            <LogIn size={16} /> Sign In
          </Link>
          <Link to="/register" className="btn-register-guest">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
