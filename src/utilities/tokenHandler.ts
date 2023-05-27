import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { IToken, ITokenPayload, IUser } from '../constants/interfaces/interface'
import { Secret } from 'jsonwebtoken';
import { errorMessage } from '../constants/variables/constants';
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

    accessPermission = (roles?: string[]) => {
        return (req: any, res: any, next: any) => {
            const token = req.headers['Authorization'] || req.headers['authorization'];
            if (!token) {
                return res.status(401).send(errorMessage[401])
            }
            else {
                jwt.verify(token, process.env.JWT_SECRET as Secret, (err: any, decoded: any) => {
                    if (err) {
                        return res.status(401).send(errorMessage[401])
                    }
                    else {
                        const payload: ITokenPayload = decoded
                        req.payload = payload
                        if (!roles || !roles.length || roles.includes(payload.role as string)) {
                            next()   
                        } else {
                            return res.status(401).send(errorMessage[401])
                        }
                    }
                })
            }

        }
    }
}