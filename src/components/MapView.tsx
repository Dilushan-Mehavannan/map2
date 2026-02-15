import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { Place } from '../types/index.js';
import { HOME_LOCATION } from '../data/places.js';

// Fix for default marker icons in React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  places: Place[];
  onPlaceSelect: (place: Place) => void;
}

const MapView = ({ places, onPlaceSelect }: MapViewProps) => {
  // Center map on home location
  const center: [number, number] = [HOME_LOCATION.latitude, HOME_LOCATION.longitude];

  // Create custom icons for different categories
  const createCustomIcon = (category: string) => {
    const colors: { [key: string]: string } = {
      Religious: '#FF6B6B',
      Nature: '#51CF66',
      Heritage: '#FFB347',
      Cultural: '#9775FA',
      Adventure: '#FF922B',
      Beach: '#4DABF7'
    };
    
    const color = colors[category] || '#868E96';
    
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `)}`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  return (
    <div className="map-container">
      <MapContainer 
        center={center} 
        zoom={11} 
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Home marker */}
        <Marker position={center}>
          <Popup>
            <strong>{HOME_LOCATION.name}</strong>
          </Popup>
        </Marker>

        {/* Place markers */}
        {places.map(place => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={createCustomIcon(place.category)}
          >
            <Popup>
              <div className="map-popup">
                <h4>{place.name}</h4>
                <p className="popup-category">{place.category}</p>
                <p className="popup-distance">{place.distanceFromHome} km away</p>
                <p className="popup-hours">{place.openingTime} - {place.closingTime}</p>
                <button 
                  className="popup-btn"
                  onClick={() => onPlaceSelect(place)}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="map-legend">
        <h4>Legend</h4>
        <div className="legend-items">
          {['Religious', 'Nature', 'Heritage', 'Cultural', 'Adventure', 'Beach'].map(cat => (
            <div key={cat} className="legend-item">
              <span 
                className="legend-color" 
                style={{ 
                  backgroundColor: 
                    cat === 'Religious' ? '#FF6B6B' :
                    cat === 'Nature' ? '#51CF66' :
                    cat === 'Heritage' ? '#FFB347' :
                    cat === 'Cultural' ? '#9775FA' :
                    cat === 'Adventure' ? '#FF922B' : '#4DABF7'
                }}
              />
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
