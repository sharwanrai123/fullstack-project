const mongoose=require('mongoose');

const UserSChema=new mongoose.Schema({
    name:{type:String},
    classs:{type:String},
    roll_number:{type:String}
});


const UserModel=mongoose.model('user',UserSChema);


module.exports={UserModel};