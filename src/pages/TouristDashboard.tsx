import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart, Star } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const TouristDashboard = () => {
  const { currentUser, places, visitPlans, currentVisitPlan } = useApp();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Tourist Dashboard</h2>
        <p>Welcome back, {currentUser?.name || 'guest'}!</p>
      </div>

      <div className="dashboard-widgets">
        <article className="widget-card">
          <MapPin size={24} />
          <h3>{places.length}</h3>
          <p>Listed Attractions</p>
        </article>
        <article className="widget-card">
          <Heart size={24} />
          <h3>{currentVisitPlan.length}</h3>
          <p>Current Plan Items</p>
        </article>
        <article className="widget-card">
          <Calendar size={24} />
          <h3>{visitPlans.filter(p => p.ownerId === currentUser?.id).length}</h3>
          <p>Saved Itineraries</p>
        </article>
        <article className="widget-card">
          <Star size={24} />
          <h3>Top Picks</h3>
          <p><Link to="/">Explore popular places</Link></p>
        </article>
      </div>

      <div className="dashboard-actions">
        <Link className="btn-secondary" to="/">Explore Places</Link>
        <Link className="btn-primary" to="/visit-plan">Open Visit Plan</Link>
        <Link className="btn-secondary" to="/saved-itineraries">View Saved Plans</Link>
      </div>
    </div>
  );
};

export default TouristDashboard;
