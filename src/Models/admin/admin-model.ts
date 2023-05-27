import mongoose from "mongoose";
import { IAdmin, IUser } from "../../constants/interfaces/interface";

const admin_model = new mongoose.Schema({
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const AdminModel = mongoose.model<IAdmin & mongoose.Document>(
  "admin",
  admin_model
);
