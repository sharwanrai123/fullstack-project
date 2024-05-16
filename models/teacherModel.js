const mongoose=require('mongoose');

const TeacherSchema=new mongoose.Schema({
    name:{type:String},
    classs:{type:String},
    roll_number:{type:String}
});


const TeacherModel=mongoose.model('Teacher',TeacherSchema);


module.exports={TeacherModel};