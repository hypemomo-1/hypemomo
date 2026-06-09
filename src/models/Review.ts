import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  name: string;
  phone: string;
  email: string;
  rating: number;
  feedback: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
