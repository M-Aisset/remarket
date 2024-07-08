import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user";
import { IRestaurant } from "./restaurant";

export interface IReview extends Document {
  rating: string | null;
  content: string;
  parent: mongoose.Schema.Types.ObjectId | undefined | null | IReview;
  user: mongoose.Schema.Types.ObjectId | IUser;
  restaurant: mongoose.Schema.Types.ObjectId | IRestaurant;
  createdAt: Date;
  updatedAt: Date;
}

export const ReviewSchema: Schema = new mongoose.Schema({
  rating: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
