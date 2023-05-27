import { Request, Response } from "express"

export interface ExpressRequest extends Request{
    payload?:ITokenPayload
}

export interface ExpressResponse extends Response{
 
}

export interface ITokenPayload{
    user:string,//user id
    email:string,//email
    role?:string,//role
}

export interface IUser{
    _id?:string// user id
    email?:string,//user email
    name?:string,//username
    role?:string,//role
    password?:string//hashed password
}

export interface IToken{
    token?:string // generated token
}