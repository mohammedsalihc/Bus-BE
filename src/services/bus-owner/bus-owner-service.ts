import { BusModel } from "../../Models/bus-owner/bus-model";
import { BusOwnerModel } from "../../Models/bus-owner/bus-owner-model";
import { ComplaintModel } from "../../Models/user/complain_model";
import { IBus, IBusOwner, IComplaint } from "../../constants/interfaces/interface";

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

    findbusforOwner=async(bus_owner?:string):Promise<IBus[]>=>{
        return await BusModel.find({bus_owner,approved:true})
    }

    collectComplaints=async(_ids:string[]):Promise<IComplaint[]>=>{
        return await ComplaintModel.find({bus:{$in:_ids}}).populate({path:"user",select:'-password'}).populate('bus')
    }
}