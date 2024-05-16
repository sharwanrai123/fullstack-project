const {AuthModel}=require('../models/AuthModel');
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const fs=require('fs');
// const { UserModel } = require('../models/userModel');

const PrivateKey='abcdef';
class AuthController
{
   static  registration=async(req,res)=>{
        const {username,password}=req.body;
        const hashpassword=await bcrypt.hash(password,10);

        const ExistUser=await AuthModel.findOne({username:username});
        if(ExistUser==null)
        {
            const insertUser=await AuthModel.create({
                username:username,
                password:hashpassword
            });
    
    
            await insertUser.save(); 
    
            res.send({
                status:"200",
                messege:"Registration successfull"    
            })
    
        }
        else{
            res.send({
                status:"200",
                messege:"User already Exist"    
            })
        }

       

    }


    static Login=async(req,res,next)=>{
        const {username,password}=req.body;
        

       const validateuser=await AuthModel.findOne({username:username})
       const originalPassword=await bcrypt.compare(password,validateuser.password);
       if(validateuser.username)
       { 
        if(originalPassword)
        {

            const Auth_signature=JWT.sign(validateuser.username,PrivateKey);
            res.cookie("key",Auth_signature).send({
                token:Auth_signature,
                status:"200",
                messege:"user logged in"    
            })
        }
        else{
            res.send({
                status:"201",
                messege:"Authentication failed"    
            })
        }

       }
       else{
        res.send({
            status:"201",
            messege:"Invalid user"    
        })
       }



    }

    static validateUser=async(req,res,next)=>{
        const validuser=req.headers.authorization;
        const username=req.body.username;
        if(validuser && validuser.startsWith('Bearer '))
        {
            const originalToken=validuser.substring(7);
            console.log(originalToken);

            const decodeUser=JWT.decode(originalToken,PrivateKey);
            console.log(decodeUser);
            try{
            const ExistUser=await AuthModel.findOne({username:decodeUser});
            if(ExistUser._id)
            {
               next();
            }
            else{
                return res.status(404).send("User not found");
            }
        }
        catch(e){
            return res.status(500).send("Internal server error");
        }
        }
        else{
            return res.status(401).send("Invalid user");
        }


    }

    static getdata=async(req,res,next)=>{
        const readData=fs.readFileSync('fil1.txt','utf-8');

        res.send({
            data:readData,
            status:"200"
        })


    }

    static Logout=async(req,res,next)=>{
        const {username}=req.body;

        res.cookie('key','').status(200).send({
            messege:"user logged Out",
            status:"200"
        })


    }
};


module.exports={AuthController};