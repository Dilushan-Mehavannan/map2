import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Place, VisitPlan, User, AuthCredentials } from '../types/index.js';
import { initialPlaces } from '../data/places.js';

interface AppContextType {
  places: Place[];
  visitPlans: VisitPlan[];
  currentVisitPlan: Place[];
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (credentials: AuthCredentials) => Promise<boolean>;
  logout: () => void;
  setUserRole: (role: 'tourist' | 'admin') => void;
  addPlace: (place: Place) => void;
  updatePlace: (id: string, place: Place) => void;
  deletePlace: (id: string) => void;
  addToVisitPlan: (place: Place) => void;
  removeFromVisitPlan: (placeId: string) => void;
  clearVisitPlan: () => void;
  setCurrentVisitPlan: (places: Place[]) => void;
  saveVisitPlan: (name: string) => void;
  deleteVisitPlan: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const localUsersKey = 'appUsers';

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

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Seed default admin user in localStorage if not exists
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem(localUsersKey) || '[]') as User[];
    const adminExists = users.find(u => u.role === 'admin');
    if (!adminExists) {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@srilanka.com',
        role: 'admin'
      };
      const nextUsers = [...users, adminUser];
      localStorage.setItem(localUsersKey, JSON.stringify(nextUsers));
      console.log('Default admin user seeded: admin@srilanka.com');
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem('visitPlans', JSON.stringify(visitPlans));
  }, [visitPlans]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async ({ email, password, role }: AuthCredentials) => {
    setLoading(true);
    setError('');

    try {
      if (!password) {
        setError('Password is required');
        return false;
      }

      const savedUsers = JSON.parse(localStorage.getItem(localUsersKey) || '[]') as User[];
      const found = savedUsers.find(u => u.email === email && u.role === role);
      if (!found) {
        setError('Invalid credentials');
        return false;
      }

      // NOTE: password is not secure in local storage. Use proper auth with backend (JWT + bcrypt) in production.
      setCurrentUser(found);
      return true;
    } catch (err) {
      setError('Failed to login');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password, role }: AuthCredentials) => {
    setLoading(true);
    setError('');

    try {
      if (!password) {
        setError('Password is required');
        return false;
      }

      const users = JSON.parse(localStorage.getItem(localUsersKey) || '[]') as User[];
      if (users.find(u => u.email === email)) {
        setError('Email already exists');
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: name || 'Anonymous',
        email,
        role,
      };
      const nextUsers = [...users, newUser];
      localStorage.setItem(localUsersKey, JSON.stringify(nextUsers));
      setCurrentUser(newUser);
      return true;
    } catch (err) {
      setError('Registration failed');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const setUserRole = (role: 'tourist' | 'admin') => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, role });
  };

  const addPlace = (place: Place) => {
    setPlaces(prev => [...prev, place]);
  };

  const updatePlace = (id: string, updatedPlace: Place) => {
    setPlaces(prev => prev.map(p => (p.id === id ? updatedPlace : p)));
  };

  const deletePlace = (id: string) => {
    setPlaces(prev => prev.filter(p => p.id !== id));
    setCurrentVisitPlan(prev => prev.filter(p => p.id !== id));
  };

  const addToVisitPlan = (place: Place) => {
    setCurrentVisitPlan(prev => {
      if (prev.find(p => p.id === place.id)) return prev;
      return [...prev, place];
    });
  };

  const removeFromVisitPlan = (placeId: string) => {
    setCurrentVisitPlan(prev => prev.filter(p => p.id !== placeId));
  };

  const clearVisitPlan = () => {
    setCurrentVisitPlan([]);
  };

  const setCurrentVisitPlanFunc = (places: Place[]) => {
    setCurrentVisitPlan(places);
  };

  const deleteVisitPlan = (id: string) => {
    setVisitPlans(prev => prev.filter(p => p.id !== id));
  };

  const saveVisitPlan = (name: string) => {
    if (!currentUser) {
      setError('Please login to save your plan.');
      return;
    }

    const newPlan: VisitPlan = {
      id: Date.now().toString(),
      name,
      places: currentVisitPlan,
      createdAt: new Date(),
      ownerId: currentUser.id
    };

    setVisitPlans(prev => [...prev, newPlan]);
    setCurrentVisitPlan([]);
  };

  return (
    <AppContext.Provider value={{
      places,
      visitPlans,
      currentVisitPlan,
      currentUser,
      isAuthenticated: Boolean(currentUser),
      loading,
      error,
      login,
      register,
      logout,
      setUserRole,
      addPlace,
      updatePlace,
      deletePlace,
      addToVisitPlan,
      removeFromVisitPlan,
      clearVisitPlan,
      setCurrentVisitPlan: setCurrentVisitPlanFunc,
      saveVisitPlan,
      deleteVisitPlan,
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
