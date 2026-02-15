import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Place, VisitPlan, User } from '../types/index.js';
import { initialPlaces } from '../data/places.js';

interface AppContextType {
  places: Place[];
  visitPlans: VisitPlan[];
  currentUser: User;
  addPlace: (place: Place) => void;
  updatePlace: (id: string, place: Place) => void;
  deletePlace: (id: string) => void;
  addToVisitPlan: (place: Place) => void;
  removeFromVisitPlan: (placeId: string) => void;
  currentVisitPlan: Place[];
  clearVisitPlan: () => void;
  saveVisitPlan: (name: string) => void;
  setUserRole: (role: 'tourist' | 'admin') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [places, setPlaces] = useState<Place[]>(() => {
    const saved = localStorage.getItem('places');
    return saved ? JSON.parse(saved) : initialPlaces;
  });
  
  const [visitPlans, setVisitPlans] = useState<VisitPlan[]>(() => {
    const saved = localStorage.getItem('visitPlans');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentVisitPlan, setCurrentVisitPlan] = useState<Place[]>([]);
  
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('userRole');
    return { role: saved === 'admin' ? 'admin' : 'tourist' };
  });

  // Save to localStorage whenever places change
  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places));
  }, [places]);

  // Save to localStorage whenever visit plans change
  useEffect(() => {
    localStorage.setItem('visitPlans', JSON.stringify(visitPlans));
  }, [visitPlans]);

  // Save user role to localStorage
  useEffect(() => {
    localStorage.setItem('userRole', currentUser.role);
  }, [currentUser]);

  const addPlace = (place: Place) => {
    setPlaces([...places, place]);
  };

  const updatePlace = (id: string, updatedPlace: Place) => {
    setPlaces(places.map(p => p.id === id ? updatedPlace : p));
  };

  const deletePlace = (id: string) => {
    setPlaces(places.filter(p => p.id !== id));
    setCurrentVisitPlan(currentVisitPlan.filter(p => p.id !== id));
  };

  const addToVisitPlan = (place: Place) => {
    if (!currentVisitPlan.find(p => p.id === place.id)) {
      setCurrentVisitPlan([...currentVisitPlan, place]);
    }
  };

  const removeFromVisitPlan = (placeId: string) => {
    setCurrentVisitPlan(currentVisitPlan.filter(p => p.id !== placeId));
  };

  const clearVisitPlan = () => {
    setCurrentVisitPlan([]);
  };

  const saveVisitPlan = (name: string) => {
    const newPlan: VisitPlan = {
      id: Date.now().toString(),
      name,
      places: currentVisitPlan,
      createdAt: new Date()
    };
    setVisitPlans([...visitPlans, newPlan]);
    setCurrentVisitPlan([]);
  };

  const setUserRole = (role: 'tourist' | 'admin') => {
    setCurrentUser({ role });
  };

  return (
    <AppContext.Provider value={{
      places,
      visitPlans,
      currentUser,
      addPlace,
      updatePlace,
      deletePlace,
      addToVisitPlan,
      removeFromVisitPlan,
      currentVisitPlan,
      clearVisitPlan,
      saveVisitPlan,
      setUserRole
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
