import mongoose from "mongoose";
import { IBusOwner } from "../../constants/interfaces/interface";

const bus_owner = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  });
  
  export const BusOwnerModel = mongoose.model<IBusOwner & mongoose.Document>(
    "bus_owner",
    bus_owner
  );
  