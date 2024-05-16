const { Patient } = require('../models/paitent_registration_model.js');
const { Patientdetail } = require('../models/patient_details_model.js');
// const {client}=require('../db3.js');

class PatientController{
    static PatientRegistration=async(req,res)=>{
        try{

        const {name,age,medical_issue,past_history,state,phone,email}=req.body;

        const ExistUser=await Patient.findOne({email:email});
        if(ExistUser==null)
        {
            const insertUser=await Patient.create({
                name:name,
                age:age,
                medical_issue:medical_issue,
                past_history:past_history,
                state:state,
                phone:phone,
                email:email,
            });
    
    
            await insertUser.save(); 
                 res.send({
                status:"200",
                messege:"Registration successfull"  ,
                data:insertUser 
            })


    
            // res.send({
            //     status:"200",
            //     messege:"Registration successfull"  ,
            //     data:insertUser  
            // })
    
        }
        else{
            res.send({
                status:"200",
                messege:"User already Exist"    
            })
        }
    }
    catch(err)
    {
        res.send(err);
    }
       

    }
    
    
    static GetPatient=async(req,res)=>{
        try{
        console.log("object")
       const patientDetail=await Patient.find();
        res.json({
            status:"ok",
            data:patientDetail,
            messege:"data fetched successfully"
        });
    
    }

catch(err)
{
    res.send(err);
}
}


static AddPatientDetail=async(req,res)=>{
    try{

    const {fathername,mothername,village,district,pincode,email}=req.body;

    const ExistUser=await Patient.findOne({email:email});
    if(ExistUser!=null)
    {
        console.log(ExistUser._id);
        const insertUser=await Patientdetail.create({
            fathername:fathername,
            mothername:mothername,
            village:village,
            district:district,
            pincode:pincode,
            email:email,
            patient_id:ExistUser._id
        });


        await insertUser.save(); 
             res.send({
            status:"200",
            messege:"Details inserted"  ,
            data:insertUser 
        })

    }
    else{
        res.send({
            status:"200",
            messege:"patient with this id not exist Exist"    
        })
    }
}
catch(err)
{
    res.send(err);
}
   

}

static GetPatientWithDetails=async(req,res)=>{
    try{
//    const patientDetail=await Patient.find();
const aggregationResult=await Patient.aggregate([
    {
        $lookup: {
            from: 'patientdetails',
            localField: '_id',
            foreignField: 'patient_id',
            as: 'details'
        }
    },
    {
        $unwind: '$details'
    },
    {
        $project: {
        name:1,
        age:1,
        phone:1,
        fathername: '$details.fathername',
        mothername: '$details.mothername',
        village: '$details.village',
        district: '$details.district',
        pincode: '$details.pincode',
        }
    }
]);
  
    res.json({
        status:"ok",
        data:aggregationResult,
        messege:"data fetched successfully"
    });

}

catch(err)
{
res.send(err);
}
}



static GetPatientorderByName=async(req,res)=>{
    try{
//    const patientDetail=await Patient.find().sort({ name: -1 }); 
//    -1 for desc ,1 for asc
// limit(2)
// group  for coruping value
// match for filter data from collections   
// (gt)=greaterthan,(gte)=greaterthan or equalto
  const aggregationResult=await Patient.aggregate([
    {
      $group: {
        _id:"$state",
        count: { $sum: 1 },
        avarageAge:{
            $avg:"$age"
        }
       
      }
    },
    {
        $match: { "avarageAge": { $gte: 25 } }
      }, 
    {
        $sort: {state: 1 }
      },
    {
          $limit:10
      }
  ]);
  console.log(aggregationResult);


   
  
    res.json({
        status:"ok",
        data:aggregationResult,
        messege:"data fetched successfully"
    });

}

catch(err)
{
res.send(err);
}
}
}

module.exports={PatientController};