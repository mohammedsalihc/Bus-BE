import { BusModel } from "../../Models/bus-owner/bus-model";
import { BusOwnerModel } from "../../Models/bus-owner/bus-owner-model";
import { IBus, IBusOwner } from "../../constants/interfaces/interface";

export class BusOwnerService{
    getOwner=async(email?:string):Promise<IBusOwner|null>=>{
        return await BusOwnerModel.findOne({email})
    }

    createOwner=async(body?:IBusOwner):Promise<IBusOwner>=>{
        return await BusOwnerModel.create(body)
    }

    createBusService=async(body?:IBus):Promise<IBus>=>{
        return (await BusModel.create(body)).populate({path:'bus_owner',select:'-password'})
    }
}