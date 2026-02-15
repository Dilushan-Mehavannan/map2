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
}

export interface User {
  role: 'tourist' | 'admin';
}
