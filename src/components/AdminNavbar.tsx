import { Link, useLocation } from 'react-router-dom';
import { MapPin, LogOut, Settings, BarChart3, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const AdminNavbar = () => {
  const location = useLocation();
  const { currentUser, logout } = useApp();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-admin">
      <div className="nav-container">
        <div className="nav-brand brand-admin">
          <Settings className="nav-icon nav-icon-admin" />
          <div>
            <h1>Admin Panel</h1>
            <p>Dream Tourist</p>
          </div>
        </div>

        <div className="nav-links nav-links-admin">
          <Link to="/admin" className={isActive('/admin') ? 'nav-link active nav-link-admin' : 'nav-link nav-link-admin'}>
            <BarChart3 size={20} /> Dashboard
          </Link>

          <Link to="/" className={isActive('/') ? 'nav-link active nav-link-admin' : 'nav-link nav-link-admin'}>
            <MapPin size={20} /> View Places
          </Link>

          <Link to="/admin" className={isActive('/admin') ? 'nav-link active nav-link-admin' : 'nav-link nav-link-admin'}>
            <Plus size={20} /> Manage Attractions
          </Link>
        </div>

        <div className="user-actions user-actions-admin">
          <div className="admin-info">
            <div className="admin-avatar">A</div>
            <div>
              <p className="admin-name">{currentUser?.name}</p>
              <p className="admin-role">Administrator</p>
            </div>
          </div>
          <button className="btn-logout-admin" onClick={logout}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
