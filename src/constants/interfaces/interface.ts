import { Request, Response } from "express"
import { BusType } from "../enums/bus-type-enum"
import {Moment} from 'moment'

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

export interface IAdmin{
    _id?:string,
    email?:string,
    role?:string,
    password?:string
}

export interface IBusOwner{
    name?:string,
    email?:string,
    role?:string,
    password?:string,
}

export interface IBus{
    name?:string //bus name,
    bus_type?:BusType//bus type,
    location?:string//bus area location,
    route_from?:string//starting route,
    route_to?:string//ending route,
    wifi?:boolean,//amenties
    air_condition?:boolean,//amenties
    starting_time?:Moment,//service starting time
    ending_time?:Moment,//service ending time
    approved?:boolean,//admin approved or not
    bus_code?:string,//generated bus code
    bus_owner?:IBusOwner|string, //bus owner
}