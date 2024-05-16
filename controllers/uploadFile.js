const multer=require('multer');
const path=require('path');
const fs=require('fs');



const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
  const uploadDir='tmp/ExcelFiles';
   fs.mkdirSync(uploadDir,{recursive:true});
   cb(null,uploadDir);
  },
  filename:(req,file,cb)=>{
    const filename=Date.now()+''+file.originalname;
    cb(null,filename);
  }
});


const Upload=multer({
  storage:storage
});
module.exports={Upload};