import mongoose from "mongoose";
import { IUser } from "../constants/interfaces/interface";

const user_model = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser & mongoose.Document>(
  "user",
  user_model
);
