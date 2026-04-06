import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, MapPin, Clock, Navigation, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const SavedItineraries = () => {
  const navigate = useNavigate();
  const { visitPlans, currentUser, setCurrentVisitPlan, deleteVisitPlan } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Filter plans for current user
  const userPlans = visitPlans.filter(plan => plan.ownerId === currentUser?.id);

  const handleLoadPlan = (planId: string) => {
    const plan = visitPlans.find(p => p.id === planId);
    if (plan) {
      setCurrentVisitPlan(plan.places);
      navigate('/visit-plan');
    }
  };

  const handleDeletePlan = (planId: string) => {
    if (window.confirm('Are you sure you want to delete this saved itinerary?')) {
      deleteVisitPlan(planId);
      setSelectedPlan(null);
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="saved-itineraries-page">
      <div className="page-header">
        <h2>My Saved Itineraries</h2>
        <p>View and manage your saved day plans</p>
      </div>

      {userPlans.length === 0 ? (
        <div className="empty-state">
          <Calendar size={64} />
          <h3>No saved itineraries yet</h3>
          <p>Start by creating a visit plan and saving it to see your itineraries here</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/')}
          >
            Explore Places & Create Plan
          </button>
        </div>
      ) : (
        <div className="itineraries-container">
          <div className="itineraries-grid">
            {userPlans.map(plan => {
              const totalDuration = plan.places.reduce((sum, place) => sum + place.estimatedVisitDuration, 0);
              const totalDistance = plan.places.reduce((sum, place) => sum + place.distanceFromHome, 0);
              const isSelected = selectedPlan === plan.id;

              return (
                <div 
                  key={plan.id} 
                  className={`itinerary-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan(isSelected ? null : plan.id)}
                >
                  <div className="card-header">
                    <h3>{plan.name}</h3>
                    <span className="plan-date">{formatDate(plan.createdAt)}</span>
                  </div>

                  <div className="card-stats">
                    <div className="stat-item">
                      <MapPin size={18} />
                      <span>{plan.places.length} places</span>
                    </div>
                    <div className="stat-item">
                      <Clock size={18} />
                      <span>{totalDuration}h duration</span>
                    </div>
                    <div className="stat-item">
                      <Navigation size={18} />
                      <span>{totalDistance}km distance</span>
                    </div>
                  </div>

                  <div className="places-preview">
                    <h4>Places in this plan:</h4>
                    <ul>
                      {plan.places.slice(0, 3).map(place => (
                        <li key={place.id} className="preview-item">
                          <span className={`category-tag ${place.category.toLowerCase()}`}>
                            {place.category}
                          </span>
                          <span className="place-name">{place.name}</span>
                        </li>
                      ))}
                      {plan.places.length > 3 && (
                        <li className="more-items">
                          +{plan.places.length - 3} more place{plan.places.length - 3 > 1 ? 's' : ''}
                        </li>
                      )}
                    </ul>
                  </div>

                  {isSelected && (
                    <div className="card-actions">
                      <button 
                        className="btn-primary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoadPlan(plan.id);
                        }}
                      >
                        <ArrowRight size={16} />
                        Load Plan
                      </button>
                      <button 
                        className="btn-danger btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePlan(plan.id);
                        }}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="itineraries-footer">
            <p>Click on any itinerary to view details and options</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedItineraries;
