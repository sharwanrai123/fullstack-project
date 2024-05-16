const mongoose=require('mongoose');

const PaitentSchema=new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    medical_issue:{type:String},
    past_history:{type:String},
    state:{type:String},
    phone:{type:String},
    email:{type:String},
});


const Patient=mongoose.model('Patient',PaitentSchema);


module.exports={Patient};