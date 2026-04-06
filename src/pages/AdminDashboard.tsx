import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Admin from './Admin.jsx';

const AdminDashboard = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  if (!currentUser || currentUser.role !== 'admin') {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>Welcome, {currentUser.name}. Manage attractions and traveler plans.</p>
      </div>

      <div className="dashboard-widgets">
        <article className="widget-card">
          <h3>Place Management</h3>
          <p>Add, update or delete places direct from admin panel.</p>
        </article>
        <article className="widget-card">
          <h3>Reports</h3>
          <p>See visit plan adoption and activity trends.</p>
        </article>
      </div>

      <div className="dashboard-actions">
        <Link className="btn-secondary" to="/">View Public Site</Link>
      </div>

      <Admin />
    </div>
  );
};

export default AdminDashboard;
