import { useState } from 'react';
import { Filter, Clock, Navigation } from 'lucide-react';
import type { Place, PlaceCategory } from '../types/index.js';
import { useApp } from '../context/AppContext.jsx';
import PlaceCard from '../components/PlaceCard.jsx';
import MapView from '../components/MapView.jsx';
import 'leaflet/dist/leaflet.css';

const PlacesList = () => {
  const { places, addToVisitPlan } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | 'All'>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const categories: (PlaceCategory | 'All')[] = ['All', 'Religious', 'Nature', 'Heritage', 'Cultural', 'Adventure', 'Beach'];

  const filteredPlaces = selectedCategory === 'All' 
    ? places 
    : places.filter(p => p.category === selectedCategory);

  const handleAddToPlan = (place: Place) => {
    addToVisitPlan(place);
  };

  return (
    <div className="places-list-page">
      <div className="page-header">
        <h2>Explore Places of Interest</h2>
        <p>Discover amazing locations within 25km</p>
      </div>

      <div className="filters-bar">
        <div className="category-filters">
          <Filter size={20} />
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            className={viewMode === 'list' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
          <button
            className={viewMode === 'map' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setViewMode('map')}
          >
            Map View
          </button>
        </div>
      </div>

      <div className="results-info">
        <p>{filteredPlaces.length} places found</p>
      </div>

      {viewMode === 'list' ? (
        <div className="places-grid">
          {filteredPlaces.map(place => (
            <PlaceCard 
              key={place.id} 
              place={place} 
              onAddToPlan={handleAddToPlan}
              onViewDetails={setSelectedPlace}
            />
          ))}
        </div>
      ) : (
        <MapView 
          places={filteredPlaces} 
          onPlaceSelect={setSelectedPlace}
        />
      )}

      {selectedPlace && (
        <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPlace(null)}>×</button>
            <div className="place-details">
              {selectedPlace.imageUrl && (
                <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="place-detail-image" />
              )}
              <h2>{selectedPlace.name}</h2>
              <span className="category-badge">{selectedPlace.category}</span>
              
              <div className="detail-section">
                <h3>Description</h3>
                <p>{selectedPlace.description}</p>
              </div>

              <div className="detail-section">
                <h3><Clock size={18} /> Opening Hours</h3>
                <p>{selectedPlace.openingTime} - {selectedPlace.closingTime}</p>
                <p className="visit-duration">Estimated visit: {selectedPlace.estimatedVisitDuration} hours</p>
              </div>

              <div className="detail-section">
                <h3><Navigation size={18} /> Travel Information</h3>
                <p><strong>Distance from home:</strong> {selectedPlace.distanceFromHome} km</p>
                <p><strong>Tips:</strong> {selectedPlace.travelTips}</p>
              </div>

              <button 
                className="btn-primary"
                onClick={() => {
                  handleAddToPlan(selectedPlace);
                  setSelectedPlace(null);
                }}
              >
                Add to Visit Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacesList;
