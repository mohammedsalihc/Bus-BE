import { BusModel } from "../../Models/bus-owner/bus-model";
import { ComplaintModel } from "../../Models/user/complain_model";
import { UserModel } from "../../Models/user/usermodel";
import { IBus, IComplaint, IUser } from "../../constants/interfaces/interface";

export class userService {

    userByEmail=async(email?:string):Promise<IUser|null>=>{
        return await UserModel.findOne({email})
    }

    createUser=async(body?:IUser):Promise<IUser>=>{
        return await UserModel.create(body)
    }

    listBuses = async (location?: string,route_from?: string,route_to?: string,bus_type?: string): Promise<IBus[]> => {
        const query: any = {approved: true,};
        if (location) {
          query.location = location;
        }
      
        if (route_from) {
          query.route_from = route_from;
        }
      
        if (route_to) {
          query.route_to = route_to;
        }
      
        if (bus_type) {
          query.bus_type = bus_type;
        }
        return await BusModel.find(query);
    }

    getbus=async(_id:string):Promise<IBus|null>=>{
        return await BusModel.findOne({_id,approved:true})
    }

    createComplaint=async(body:IComplaint):Promise<IComplaint>=>{
        return await ComplaintModel.create(body)
    }

    getUserBYid=async(_id:string):Promise<IUser>=>{
      return await UserModel.findOne({_id}).select('-password');
    }
}