import { UserModel } from "../../Models/user/usermodel";
import { IUser } from "../../constants/interfaces/interface";

export class userService {

    userByEmail=async(email?:string):Promise<IUser|null>=>{
        return await UserModel.findOne({email})
    }

    createUser=async(body?:IUser):Promise<IUser>=>{
        return await UserModel.create(body)
    }
}