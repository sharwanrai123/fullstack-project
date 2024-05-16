const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const  {client}=require('./db3');
// const {conn}=require('./db');
const {UserModel}=require('./models/userModel');
const {TeacherModel}=require('./models/teacherModel');
const cookieParser=require('cookie-parser');
const fs=require('fs');
const multer=require('multer');


const {UserRouter}=require('./routes/userRoute');
const { AuthRouter } = require('./routes/AuthRoutes');
const { AuthController } = require('./controllers/AuthController');
const { PatientRouter } = require('./routes/patient_route');
const app=express();

const port=3100;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'tmp/my-uploads';
        fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
        cb(null, uploadDir);
    },
    filename:async function (req, file, cb) {
        const uploadDir = 'tmp/my-uploads';
        const originalName=file.originalname;
        try {
            const files = await fs.promises.readdir(uploadDir);
            console.log(files);
            if (files.includes(originalName)) {
              const error = new Error('File already exists');
              error.code = 'EEXIST';
              return cb(error);
            }
          } catch (err) {
            return cb(err);
          }
      cb(null,file.originalname)
    },
  })
  
  const upload = multer({ 
    storage: storage,
    limits:function (req,file,cb){
        if ((file.size) <1000) {
            cb(null, true); 
        } else {
            const error = new Error('File size too large');
            error.code = 'FTL';
            return cb(error); 
        }
    },
    fileFilter: function(req, file, cb) {
        if (file.mimetype === 'image/jpeg') {
          cb(null, true);
        } else {
          
          const error= new Error('Only JPEG images are allowed');
          error.code='OJP';
          return cb(error);
        }
      }
})

  app.post('/uploadFile',AuthController.validateUser,upload.single('image'),async(req,res)=>{

   try{
    console.log(req.file);
    res.send("uploaded file")
   }
   catch(error){
    res.send(error)
   }

  })
app.use('/User',UserRouter);
app.use('/Users',AuthRouter);
app.use('/api/v1',PatientRouter);


app.post('/addStudent',async(req,res)=>{
    console.log("student");

    const {name,classs,roll_number}=req.body;

    const insertData = await UserModel.InsertOne({
        name: name,
        classs: classs,
        roll_number: roll_number
    });

    await insertData.save();
    res.send(insertData);
})

app.post('/addTeacher',async(req,res)=>{
    console.log("Teacher");

    const {name,classs,roll_number}=req.body;

    const insertData = await TeacherModel.create({
        name: name,
        classs: classs,
        roll_number: roll_number
    });

    await insertData.save();
    res.send(insertData);
})

app.get('/getTeacher',async(req,res)=>{
    console.log("Teacher");
    const {id}=req.query;

//    const data=await TeacherModel.find();
   const data=await TeacherModel.findById(id);
    res.send(data);
});
// fs.readFile('fil1.txt','utf-8',(err,data)=>{
//     if (err) throw err;
//     else{
//        console.log(data) 
//     }
// })

// const data=fs.readFileSync('fil1.txt','utf-8');
// console.log(data);

// const Text='he is my friend \n';
// const appendFile=fs.appendFileSync('fil1.txt',Text);
// middleware to handle error---------------------------------------------
app.use((err, req, res, next)=> {
    if (err.code === 'EEXIST') {
      // Send response indicating file already exists
      res.status(409).send('File already exists');
    } else if(err.code === 'OJP')
    {
        res.status(409).send('only jpeg images are allowed');
    }
    else if(err.code === 'FTL')
    {
        res.status(409).send('file size too large');
    }
    else {
      // For other errors, send a generic error response
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });
//   ------------------------------------------------------------------


app.listen(port,()=>{
    console.log("app is listening on port ",port);
})