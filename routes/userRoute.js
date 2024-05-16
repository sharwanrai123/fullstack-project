const express=require('express');
const {User}=require('../controllers/userController');
const {Upload}=require('../controllers/uploadFile');
const { UploadCsv } = require('../controllers/uploadCsv');



const UserRouter=express.Router();

UserRouter.get('/GetUser',User.GetUser);
UserRouter.post('/UploadExcel',Upload.single('user'),User.Upload_excel_in_mysql);
UserRouter.post('/UploadCsv',UploadCsv.single('user'),User.Upload_csvFile_in_mysql);
UserRouter.post('/postaid',UploadCsv.single('user'),User.post_radiofm_aid);
UserRouter.get('/getaid',UploadCsv.single('user'),User.get_radiofm_aid);

module.exports={UserRouter};