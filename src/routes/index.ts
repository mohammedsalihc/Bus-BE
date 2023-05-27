import { Application } from "express";
import admin_route from './admin/admin-routes'
import user_route from './user/user-routes'
import bus_owner_route from './bus-owner/bus-owner-routes'

const registeredEndPoints=(app:Application)=>{
    app.get('/BISS',(req,res)=>res.json('welcome to BISS Rest Api Service'))
    app.use('/BISS/api/admin',admin_route)
    app.use('/BISS/api/user',user_route)
    app.use('/BISS/api/bus-owner',bus_owner_route)
    
}

export {registeredEndPoints}