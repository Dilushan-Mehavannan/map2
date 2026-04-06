export type PlaceCategory = 'Religious' | 'Nature' | 'Heritage' | 'Cultural' | 'Adventure' | 'Beach';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  openingTime: string;
  closingTime: string;
  travelTips: string;
  distanceFromHome: number; // in km
  latitude: number;
  longitude: number;
  imageUrl?: string;
  estimatedVisitDuration: number; // in hours
}

export interface VisitPlan {
  id: string;
  name: string;
  places: Place[];
  createdAt: Date;
  ownerId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'admin';
}

export interface AuthCredentials {
  name?: string;
  email: string;
  password: string;
  role: 'tourist' | 'admin';
}

export interface PlaceReview {
  id: string;
  placeId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
