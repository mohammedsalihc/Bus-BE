import { AdminModel } from "../../Models/admin/admin-model";
import { IAdmin } from "../../constants/interfaces/interface";

export class AdminSerivice{
   
    getAdmin=async(email?:string):Promise<IAdmin|null>=>{
        return await AdminModel.findOne({email})
    }
}