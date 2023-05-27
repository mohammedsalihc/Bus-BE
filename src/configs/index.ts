import startMongoDbServer from "./database/mongo-config"
import { startServer } from "./server/serverconfig"


const connect=()=>{
    startMongoDbServer()
    startServer()

}


export {connect}