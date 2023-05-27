import mongoose from "mongoose";
import { getCurrentDateandTime } from "../../utilities/moment-handler";
import { IComplaint } from "../../constants/interfaces/interface";

const complaint_schema=new mongoose.Schema({
    problem:{type:String,required:true},
    comment:{type:String},
    bus:{type:String,required:true, ref:"bus"},
    created:{type:Date,default:getCurrentDateandTime()},
    user:{type:String,required:true, ref:"user"}
})


export const ComplaintModel=mongoose.model<IComplaint & mongoose.Document>('complaint',complaint_schema)