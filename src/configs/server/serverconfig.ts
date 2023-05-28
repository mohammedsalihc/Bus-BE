import express,{Application} from 'express'
import * as dotenv from 'dotenv'
import middlewares from '../../middlewares/middlewares'
import { registeredEndPoints } from '../../routes'


dotenv.config()

const app:Application=express()

const startServer=()=>{
    let port =portNumber()
    middlewares(app)
    registeredEndPoints(app)
    const server=app.listen(port,()=>console.log(`server started port ${port}`))
}



const portNumber=():number =>{
    return Number(process.env.PORT)||8090
}


export {startServer}