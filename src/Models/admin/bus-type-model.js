const mongoose=require('mongoose')

const bus_type_schema = mongoose.Schema({
    bus_type:{type:String,required:true}
})


const busTypModel=mongoose.model('bustype',bus_type_schema)
module.exports=busTypModel