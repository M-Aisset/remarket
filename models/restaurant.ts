import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user";

interface IMenuItem extends Document {
  name: string;
  imageUrl: string;
  price: number;
}
const MenuItemSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

interface IMenu extends Document {
  menuPagesImageUrl: string[];
  menuItems: IMenuItem[];
}
const MenuSchema: Schema = new mongoose.Schema({
  menuPagesImageUrl: {
    type: [String],
    required: true,
  },
  menuItems: {
    type: [MenuItemSchema],
    required: true,
  },
});

interface IRestaurantImage extends Document {
  imageUrl: string;
  isMain: boolean;
}
const RestaurantImageSchema: Schema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  isMain: {
    type: Boolean,
    default: false,
    required: true,
  },
});

interface IHour extends Document {
  day: string;
  from: string;
  to: string;
  isClosed: boolean;
}
const HourSchema: Schema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  isClosed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export interface IRestaurant extends Document {
  name: string;
  email: string;
  phone: string;
  wilaya: string;
  address: string;
  location: string;
  categories: string[];
  offerings: string[];
  description: string;
  menu: IMenu;
  images: IRestaurantImage[];
  hours: IHour[];
  user: mongoose.Schema.Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}
export const RestaurantSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  wilaya: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  offerings: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  menu: { type: MenuSchema, required: true },
  images: { type: [RestaurantImageSchema], required: true },
  hours: { type: [HourSchema], required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

export const Restaurant: Model<IRestaurant> =
  mongoose.models.Restaurant || mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
