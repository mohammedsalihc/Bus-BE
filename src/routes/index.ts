import { Application } from "express";


const registeredEndPoints=(app:Application)=>{
    app.get('/',(req,res)=>res.json('welcome to e-commerce solution Rest Api Service'))

}

export {registeredEndPoints}