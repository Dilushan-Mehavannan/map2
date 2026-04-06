import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Save, Calendar, Clock, Navigation, Check } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const VisitPlan = () => {
  const navigate = useNavigate();
  const { currentVisitPlan, removeFromVisitPlan, clearVisitPlan, saveVisitPlan, error } = useApp();
  const [planName, setPlanName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const totalDuration = currentVisitPlan.reduce((sum, place) => sum + place.estimatedVisitDuration, 0);
  const totalDistance = currentVisitPlan.reduce((sum, place) => sum + place.distanceFromHome, 0);

  const handleSave = () => {
    if (planName.trim()) {
      saveVisitPlan(planName);
      setPlanName('');
      setShowSaveDialog(false);
      setShowSuccessMessage(true);
      
      // Auto-redirect after 2 seconds
      setTimeout(() => {
        navigate('/saved-itineraries');
      }, 2000);
    }
  };

  return (
    <div className="visit-plan-page">
      <div className="page-header">
        <h2>My One-Day Visit Plan</h2>
        <p>Plan your perfect day exploring Sri Lanka</p>
      </div>

      {currentVisitPlan.length === 0 ? (
        <div className="empty-state">
          <Calendar size={64} />
          <h3>No places in your visit plan yet</h3>
          <p>Start adding places from the Places page to create your itinerary</p>
        </div>
      ) : (
        <>
          <div className="plan-summary">
            <div className="summary-card">
              <h3>Plan Summary</h3>
              <div className="summary-stats">
                <div className="stat">
                  <Calendar size={24} />
                  <div>
                    <span className="stat-value">{currentVisitPlan.length}</span>
                    <span className="stat-label">Places</span>
                  </div>
                </div>
                <div className="stat">
                  <Clock size={24} />
                  <div>
                    <span className="stat-value">{totalDuration}h</span>
                    <span className="stat-label">Total Duration</span>
                  </div>
                </div>
                <div className="stat">
                  <Navigation size={24} />
                  <div>
                    <span className="stat-value">{totalDistance}km</span>
                    <span className="stat-label">Total Distance</span>
                  </div>
                </div>
              </div>

              <div className="plan-actions">
                <button 
                  className="btn-primary"
                  onClick={() => setShowSaveDialog(true)}
                >
                  <Save size={18} />
                  Save Plan
                </button>
                <button 
                  className="btn-danger"
                  onClick={clearVisitPlan}
                >
                  <Trash2 size={18} />
                  Clear All
                </button>
              </div>
            </div>
          </div>

          <div className="itinerary">
            <h3>Your Itinerary</h3>
            <div className="itinerary-list">
              {currentVisitPlan.map((place, index) => (
                <div key={place.id} className="itinerary-item">
                  <div className="itinerary-number">{index + 1}</div>
                  <div className="itinerary-content">
                    <div className="itinerary-header">
                      <h4>{place.name}</h4>
                      <span className={`category-tag ${place.category.toLowerCase()}`}>
                        {place.category}
                      </span>
                    </div>
                    <p className="itinerary-description">{place.description}</p>
                    <div className="itinerary-details">
                      <span><Clock size={16} /> {place.openingTime} - {place.closingTime}</span>
                      <span><Navigation size={16} /> {place.distanceFromHome} km</span>
                      <span>Duration: {place.estimatedVisitDuration}h</span>
                    </div>
                    <div className="itinerary-tips">
                      <strong>Tips:</strong> {place.travelTips}
                    </div>
                  </div>
                  <button 
                    className="btn-remove"
                    onClick={() => removeFromVisitPlan(place.id)}
                    title="Remove from plan"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {totalDuration > 12 && (
            <div className="warning-message">
              ⚠️ Your plan exceeds 12 hours. Consider reducing the number of places for a more relaxed day.
            </div>
          )}
        </>
      )}

      {showSaveDialog && (
        <div className="modal-overlay" onClick={() => setShowSaveDialog(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Save Visit Plan</h3>
            <input
              type="text"
              placeholder="Enter plan name (e.g., Weekend Trip)"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="plan-name-input"
              autoFocus
            />
            {error && <p className="form-error">{error}</p>}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="success-message-banner">
          <div className="success-content">
            <Check size={24} />
            <div>
              <h4>Plan Saved Successfully!</h4>
              <p>Redirecting to your saved itineraries...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitPlan;
