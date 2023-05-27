import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { IToken, ITokenPayload, IUser } from '../constants/interfaces/interface'
import { Secret } from 'jsonwebtoken';
dotenv.config()

export class JwtHandler {
    
    accessToken=async(user:string,email:string,role:any):Promise<string>=>{
        let payload:ITokenPayload={
            user,
            email,
            role
        }

        return jwt.sign(payload,process.env.JWT_SECRET as Secret)
    }

    createToken=async(user:IUser):Promise<IToken>=>{
        const token:string=await this.accessToken(user._id as string,user.email as string,user.role)
        return {token}
    }
}