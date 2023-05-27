import bcrypt from 'bcrypt'
 
const saltrounds=10;

export class BcryptHandler{
    
    getPasswordHash=async(password:string):Promise<string>=>{
        return await bcrypt.hash(password,saltrounds)
    }

    verifyPassword=async(hash:string,password:string)=>{
        return await bcrypt.compare(password,hash)
    }
}