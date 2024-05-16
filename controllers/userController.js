const {conn}=require('../db');
// const xlsx =require('xlsx');
const fs=require('fs');
const xlsx=require('node-xlsx')
const csv=require('csv-parse');
const readline=require('readline');






var ApiData;

class User{
  static PostUser=  async(req,res)=>{
        console.log("working-,,,");
      const {namee,classs,roll_number}=req.body;
        const insertData=await conn.promise().query(`INSERT INTO student (roll_number,name,classs) VALUES ('${roll_number}','${namee}','${classs}')`)
        .catch((e)=>{
            console.log(e)
        });
        res.send({
            status:"ok",
            data:insertData,
            messege:"data inserted successfully"
        });
    
    }
    
    
    static GetUser=async(req,res)=>{
        console.log("working-,,,");
      await conn.promise().query(`SELECT * FROM student`)
        .then(([rows, fields]) => {
            console.log(rows); // Rows without buffer data
            ApiData=rows
            // console.log(fields)
          })
          .catch((err) => {
            console.error(err);
          });
        res.json({
            status:"ok",
            data:ApiData,
            messege:"data fetched successfully"
        });
    
    }


    static Upload_excel_in_mysql=async(req,res)=>{
      try{
      const filePath=req.file.path;
      const workSheetsFromFile = xlsx.parse(filePath);
      const excelData=workSheetsFromFile[0].data;
      var insertData;
      for(let i=1;i<excelData.length;i++)
      {
         insertData=await conn.promise().query(`INSERT INTO employee (name,email,user_id,salary) VALUES ('${excelData[i][0]}','${excelData[i][1]}','${excelData[i][2]}','${excelData[i][3]}')`) 
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });

  
      res.json({
        status:"ok",
        data:insertData,
        messege:"data fetched successfully"
      });

    }
    catch(err){
      throw err;
    }
  }

  static Upload_csvFile_in_mysql=async(req,res)=>{
    try{
      var insertData;
      var linenumber=0;
      const filePath=req.file.path;

      const data=fs.readFileSync(filePath,'utf-8');
      console.log(data);
      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity 
      });
      rl.on('line', async(line) => {
        linenumber=linenumber+1;
        if(linenumber>1)
        {
        try{
        const word=line.split(',');
         insertData= await conn.promise().query(`INSERT INTO employee (name,email,user_id,salary) VALUES ('${word[0]}','${word[1]}','${word[2]}','${word[3]}')`)
        console.log(word);
        }
        catch(err)
        {
          console.log(err);
        }
      }
        
      });
      rl.on('error', (err) => {
        console.error('Error reading file:', err);
      });
      rl.on('close', () => {
        console.log('End of file');
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted successfully');
          }
        });
      });
      // fs.unlink(filePath);
      console.log(filePath);

    res.json({
      status:"ok",
      data:insertData,
      messege:"data fetched successfully"
    });

  }
  catch(err){
    throw err;
  }
}

static post_radiofm_aid=async(req,res)=>{
  try{
    var insertData;
    const rewarrd_add=1;
    const home_add=3;


  res.json({
    status:"ok",
    data:insertData,
    messege:"data fetched successfully"
  });

}
catch(err){
  throw err;
}
}

static get_radiofm_aid=async(req,res)=>{
  try{
    var insertData;
    var linenumber=0;
    const filePath=req.file.path;

    const data=fs.readFileSync(filePath,'utf-8');
    console.log(data);
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity 
    });
    rl.on('line', async(line) => {
      linenumber=linenumber+1;
      if(linenumber>1)
      {
      try{
      const word=line.split(',');
       insertData= await conn.promise().query(`INSERT INTO employee (name,email,user_id,salary) VALUES ('${word[0]}','${word[1]}','${word[2]}','${word[3]}')`)
      console.log(word);
      }
      catch(err)
      {
        console.log(err);
      }
    }
      
    });
    rl.on('error', (err) => {
      console.error('Error reading file:', err);
    });
    rl.on('close', () => {
      console.log('End of file');
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });
    });
    // fs.unlink(filePath);
    console.log(filePath);

  res.json({
    status:"ok",
    data:insertData,
    messege:"data fetched successfully"
  });

}
catch(err){
  throw err;
}
}
}



module.exports={User};
