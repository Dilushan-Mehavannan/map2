import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Religious', 'Nature', 'Heritage', 'Cultural', 'Adventure', 'Beach'], required: true },
  description: { type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  travelTips: { type: String },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  distanceFromHome: { type: Number, default: 0 },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  imageUrl: { type: String },
  estimatedVisitDuration: { type: Number, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Place', PlaceSchema);
