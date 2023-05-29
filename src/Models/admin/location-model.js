const mongoose=require('mongoose')

const location_schema=new mongoose.Schema({
    location:{type:String,required:true}
})


const locationModel=mongoose.model('locations',location_schema)

module.exports=locationModel