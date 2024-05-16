const mongoose=require('mongoose');

const PaitentDetailSchema=new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Patient' // Reference to the 'patients' collection
    },
    fathername:{type:String},
    mothername:{type:String},
    village:{type:String},
    district:{type:String},
    pincode:{type:String},
    email:{type:String}
});


const Patientdetail=mongoose.model('Patientdetail',PaitentDetailSchema);


module.exports={Patientdetail};