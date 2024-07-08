import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user";
import { IRestaurant } from "./restaurant";

export interface IRestaurantLike extends Document {
  user: mongoose.Schema.Types.ObjectId | IUser;
  restaurant: mongoose.Schema.Types.ObjectId | IRestaurant;
}

export const RestaurantLikeSchema: Schema = new mongoose.Schema({
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
});

export const RestaurantLike: Model<IRestaurantLike> =
  mongoose.models.RestaurantLike || mongoose.model<IRestaurantLike>("RestaurantLike", RestaurantLikeSchema);
