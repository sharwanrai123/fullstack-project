var mysql = require('mysql2');
const dotenv=require('dotenv');
dotenv.config();

const db_url=JSON.parse(process.env.MYSQL);
console.log(db_url.host)

const conn = mysql.createConnection(db_url);

  conn.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log("database connected");
    }

  })


  const name='"hdjshdjhsjd"';
  console.log(JSON.parse(name));
  





  module.exports ={conn};
  