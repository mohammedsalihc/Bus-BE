import { BusOwnerModel } from "../../Models/bus-owner/bus-owner-model";
import { IBusOwner } from "../../constants/interfaces/interface";

export class BusOwnerService{
    getOwner=async(email?:string):Promise<IBusOwner|null>=>{
        return await BusOwnerModel.findOne({email})
    }

    createOwner=async(body?:IBusOwner):Promise<IBusOwner>=>{
        return await BusOwnerModel.create(body)
    }
}