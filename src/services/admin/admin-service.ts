import { AdminModel } from "../../Models/admin/admin-model";
import { BusModel } from "../../Models/bus-owner/bus-model";
import { ComplaintModel } from "../../Models/user/complain_model";
import { IAdmin, IBus, IComplaint } from "../../constants/interfaces/interface";

export class AdminSerivice{
   
    getAdmin=async(email?:string):Promise<IAdmin|null>=>{
        return await AdminModel.findOne({email})
    }

    ApproveBus=async(_id:string,update:IBus):Promise<IBus|null>=>{
        return await BusModel.findOneAndUpdate({_id},update,{new:true})
    }

    getBus=async(_id:string):Promise<IBus|null>=>{
        return await BusModel.findOne({_id})
    }

    listAllComplaints=async():Promise<IComplaint[]>=>{
        return await ComplaintModel.find()
    }

    listAllBuses=async():Promise<IBus[]>=>{
        return await BusModel.find({approved:true})
    }

    
}