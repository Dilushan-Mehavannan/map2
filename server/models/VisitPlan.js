import mongoose from 'mongoose';

const VisitPlanSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft', 'confirmed', 'completed'], default: 'draft' }
});

export default mongoose.model('VisitPlan', VisitPlanSchema);
