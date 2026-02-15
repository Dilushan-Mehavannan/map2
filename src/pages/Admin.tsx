import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import type { Place, PlaceCategory } from '../types/index.js';

const Admin = () => {
  const { places, addPlace, updatePlace, deletePlace } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [formData, setFormData] = useState<Partial<Place>>({
    name: '',
    category: 'Nature',
    description: '',
    openingTime: '09:00',
    closingTime: '17:00',
    travelTips: '',
    distanceFromHome: 0,
    latitude: 6.9271,
    longitude: 79.8612,
    imageUrl: '',
    estimatedVisitDuration: 2
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPlace) {
      updatePlace(editingPlace.id, { ...editingPlace, ...formData } as Place);
    } else {
      const newPlace: Place = {
        id: Date.now().toString(),
        ...formData
      } as Place;
      addPlace(newPlace);
    }
    
    resetForm();
  };

  const handleEdit = (place: Place) => {
    setEditingPlace(place);
    setFormData(place);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      deletePlace(id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Nature',
      description: '',
      openingTime: '09:00',
      closingTime: '17:00',
      travelTips: '',
      distanceFromHome: 0,
      latitude: 6.9271,
      longitude: 79.8612,
      imageUrl: '',
      estimatedVisitDuration: 2
    });
    setEditingPlace(null);
    setShowForm(false);
  };

  const categories: PlaceCategory[] = ['Religious', 'Nature', 'Heritage', 'Cultural', 'Adventure', 'Beach'];

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Admin Panel</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add New Place
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>{places.length}</h3>
          <p>Total Places</p>
        </div>
        {categories.map(cat => (
          <div key={cat} className="stat-card">
            <h3>{places.filter(p => p.category === cat).length}</h3>
            <p>{cat}</p>
          </div>
        ))}
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Distance (km)</th>
              <th>Opening Hours</th>
              <th>Duration (h)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {places.map(place => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>
                  <span className={`category-tag ${place.category.toLowerCase()}`}>
                    {place.category}
                  </span>
                </td>
                <td>{place.distanceFromHome}</td>
                <td>{place.openingTime} - {place.closingTime}</td>
                <td>{place.estimatedVisitDuration}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon btn-edit"
                      onClick={() => handleEdit(place)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(place.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingPlace ? 'Edit Place' : 'Add New Place'}</h3>
              <button className="modal-close" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="place-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PlaceCategory })}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Opening Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.openingTime}
                    onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label>Closing Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.closingTime}
                    onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Distance from Home (km) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="25"
                    step="0.1"
                    value={formData.distanceFromHome}
                    onChange={(e) => setFormData({ ...formData, distanceFromHome: parseFloat(e.target.value) })}
                  />
                </div>
                
                <div className="form-group">
                  <label>Estimated Visit Duration (hours) *</label>
                  <input
                    type="number"
                    required
                    min="0.5"
                    max="8"
                    step="0.5"
                    value={formData.estimatedVisitDuration}
                    onChange={(e) => setFormData({ ...formData, estimatedVisitDuration: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Latitude *</label>
                  <input
                    type="number"
                    required
                    step="0.0001"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  />
                </div>
                
                <div className="form-group">
                  <label>Longitude *</label>
                  <input
                    type="number"
                    required
                    step="0.0001"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label>Travel Tips *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.travelTips}
                  onChange={(e) => setFormData({ ...formData, travelTips: e.target.value })}
                  placeholder="Share helpful tips for visitors..."
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={18} />
                  {editingPlace ? 'Update Place' : 'Add Place'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
