import { MapPin, Clock, Plus } from 'lucide-react';
import type { Place } from '../types/index.js';

interface PlaceCardProps {
  place: Place;
  onAddToPlan: (place: Place) => void;
  onViewDetails: (place: Place) => void;
  showActions?: boolean;
}

const PlaceCard = ({ place, onAddToPlan, onViewDetails, showActions = true }: PlaceCardProps) => {
  return (
    <div className="place-card">
      {place.imageUrl && (
        <div className="place-card-image">
          <img src={place.imageUrl} alt={place.name} />
          <span className="distance-badge">
            <MapPin size={14} />
            {place.distanceFromHome} km
          </span>
        </div>
      )}
      
      <div className="place-card-content">
        <div className="place-card-header">
          <h3>{place.name}</h3>
          <span className={`category-tag ${place.category.toLowerCase()}`}>
            {place.category}
          </span>
        </div>
        
        <p className="place-description">{place.description.substring(0, 100)}...</p>
        
        <div className="place-info">
          <div className="info-item">
            <Clock size={16} />
            <span>{place.openingTime} - {place.closingTime}</span>
          </div>
          <div className="info-item">
            <span className="duration-text">{place.estimatedVisitDuration}h visit</span>
          </div>
        </div>

        {showActions && (
          <div className="place-card-actions">
            <button 
              className="btn-secondary"
              onClick={() => onViewDetails(place)}
            >
              View Details
            </button>
            <button 
              className="btn-primary btn-icon"
              onClick={() => onAddToPlan(place)}
              title="Add to visit plan"
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
