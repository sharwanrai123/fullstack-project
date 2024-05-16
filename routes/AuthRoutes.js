const express=require('express');
const { AuthController } = require('../controllers/AuthController');
const AuthRouter=express.Router();



AuthRouter.post('/Registration',AuthController.registration);
AuthRouter.post('/Login',AuthController.Login);
AuthRouter.post('/validateUser',AuthController.validateUser,AuthController.getdata);
AuthRouter.post('/Login',AuthController.Logout);
// AuthRouter.post('/getData',AuthController.getdata);

module.exports={AuthRouter};