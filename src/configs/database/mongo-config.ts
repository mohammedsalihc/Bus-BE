import mongoose, { mongo } from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()

const startMongoDbServer = () => {
    const url = process.env.DBURL
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    } as mongoose.ConnectOptions;

    mongoose.connect(url as any, options)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'db connection error'))
    db.once('open', () => {
        console.log(`Db connected to url:${url}`)
    })
}



export default startMongoDbServer