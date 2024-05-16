const express=require('express');
const { PatientController } = require('../controllers/patient');
const PatientRouter=express.Router();



PatientRouter.post('/register',PatientController.PatientRegistration);
PatientRouter.get('/getlist',PatientController.GetPatient);
PatientRouter.post('/patientdetail',PatientController.AddPatientDetail);
PatientRouter.get('/patientdetail',PatientController.GetPatientWithDetails);
PatientRouter.get('/patientbyname',PatientController.GetPatientorderByName);

// AuthRouter.post('/getData',AuthController.getdata);

module.exports={PatientRouter};