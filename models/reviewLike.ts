import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user";
import { IReview } from "./review";

export interface IReviewLike extends Document {
  user: mongoose.Schema.Types.ObjectId | IUser;
  review: mongoose.Schema.Types.ObjectId | IReview;
}

export const ReviewLikeSchema: Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },
});

export const ReviewLike: Model<IReviewLike> =
  mongoose.models.ReviewLike || mongoose.model<IReviewLike>("ReviewLike", ReviewLikeSchema);
